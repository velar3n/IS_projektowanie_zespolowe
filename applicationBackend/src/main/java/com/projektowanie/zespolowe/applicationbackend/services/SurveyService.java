package com.projektowanie.zespolowe.applicationbackend.services;

import com.projektowanie.zespolowe.applicationbackend.controllers.SurveyController.SingleQuestionAnswer;
import com.projektowanie.zespolowe.applicationbackend.controllers.SurveyController.SurveyRequest;

import com.projektowanie.zespolowe.applicationbackend.data.model.*;
import com.projektowanie.zespolowe.applicationbackend.services.util.QuestionValidator;
import com.projektowanie.zespolowe.applicationbackend.services.util.SurveyRequestValidator;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final QuestionRepository questionRepository;
    private final QuestionOptionRepository questionOptionRepository;
    private final UserSubmissionRepository userSubmissionRepository;
    private final SurveyRequestValidator surveyRequestValidator;
    private final SurveyMapper surveyMapper;
    private final QuestionValidator questionValidator;

    public Survey createSurveyFromRequest(SurveyRequest surveyRequest) {
        surveyRequestValidator.validate(surveyRequest);
        questionValidator.validateQuestions(surveyRequest.questions());

        Survey survey = surveyMapper.toEntity(surveyRequest);

        List<Question> questions = surveyRequest.questions().stream()
                .map(questionRequest -> {
                    Question question = Question.builder()
                            .text(questionRequest.text())
                            .type(questionRequest.type())
                            .survey(survey)
                            .build();

                    List<QuestionOption> options = questionRequest.options().stream()
                            .map(optionText -> {
                                QuestionOption option = new QuestionOption();
                                option.setText(optionText);
                                option.setQuestion(question);
                                return option;
                            })
                            .toList();

                    question.setOptions(options);
                    return question;
                }).toList();

        survey.setQuestions(questions);
        return surveyRepository.save(survey);

    }

    public void createSurveyResponse(String surveyId, List<SingleQuestionAnswer> surveySubmissionRequest,
            Optional<String> username) {
        Survey matchingSurvey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new IllegalArgumentException("survey with this id does not exist"));

        UserSubmission userSubmission = new UserSubmission();
        if (username.isPresent()) {
            userSubmission.setCreatedBy(username.get());
        }
        userSubmission.setSurvey(matchingSurvey);

        List<Answer> answers = surveySubmissionRequest.stream().map(answerRequest -> {
            Answer singleAnswer = new Answer();
            Question question = questionRepository.findById(answerRequest.questionId())
                    .orElseThrow(() -> new IllegalArgumentException("question with the given id does not exist"));
            List<QuestionOption> selectedOptions = questionOptionRepository.findAllById(answerRequest.selectedIds());
            if (selectedOptions.isEmpty()) {
                throw new IllegalArgumentException("you have to provide at least one answer to all questions");
            }

            if (selectedOptions.size() > 1 && question.getType() == "SINGLE_CHOICE") {
                throw new IllegalArgumentException("single choice questions cannot have multiple answers selected");
            }
            singleAnswer.setQuestion(question);
            singleAnswer.setSelectedOptions(selectedOptions);
            singleAnswer.setSubmission(userSubmission);
            return singleAnswer;
        }).toList();

        userSubmission.setAnswers(answers);
        userSubmissionRepository.save(userSubmission);
    }

    public SurveyResultsResponse getSurveyResults(Long surveyId) {
        List<UserSubmission> submissions = userSubmissionRepository.findAllBySurveyId(surveyId);

        Survey matchingSurvey = surveyRepository.findById(String.valueOf(surveyId))
                .orElseThrow(() -> new IllegalArgumentException("survey with this id does not exist"));

        if (submissions.isEmpty()) {
            return SurveyResultsResponse.builder()
                    .survey(matchingSurvey)
                    .questions(Collections.emptyList())
                    .build();
        }

        Map<Long, SurveyResultsResponse.SingleQuestionResult> questionMap = new LinkedHashMap<>();

        for (UserSubmission submission : submissions) {
            for (Answer answer : submission.getAnswers()) {
                Question question = answer.getQuestion();
                Long questionId = question.getId();
                String questionText = question.getText();

                questionMap.computeIfAbsent(questionId, qid -> {
                    List<QuestionOption> allOptions = question.getOptions(); // assuming a getOptions() method or fetch
                    Map<Long, SurveyResultsResponse.SingleOptionResult> optionMap = new LinkedHashMap<>();
                    for (QuestionOption opt : allOptions) {
                        optionMap.put(opt.getId(),
                                new SurveyResultsResponse.SingleOptionResult(opt.getId(), opt.getText(), 0L));
                    }
                    return new SurveyResultsResponse.SingleQuestionResult(
                            questionId,
                            questionText,
                            new ArrayList<>(optionMap.values()));
                });

                for (QuestionOption selected : answer.getSelectedOptions()) {
                    SurveyResultsResponse.SingleQuestionResult qResult = questionMap.get(questionId);
                    for (int i = 0; i < qResult.results().size(); i++) {
                        SurveyResultsResponse.SingleOptionResult opt = qResult.results().get(i);
                        if (opt.id().equals(selected.getId())) {
                            qResult.results().set(i,
                                    new SurveyResultsResponse.SingleOptionResult(opt.id(), opt.text(),
                                            opt.count() + 1));
                            break;
                        }
                    }
                }
            }
        }

        return SurveyResultsResponse.builder()
                .survey(matchingSurvey)
                .questions(new ArrayList<>(questionMap.values()))
                .build();

    }

    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    public List<Survey> getActiveSurveys() {
        return surveyRepository.findAllByIsPublic(true);
    }

    public List<Survey> getInactiveSurveys() {
        return surveyRepository.findAllByIsPublic(false);
    }

    public Optional<Survey> getSurveyDetails(String id) {
        return surveyRepository.findById(id);
    }
}