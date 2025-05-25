package com.projektowanie.zespolowe.applicationbackend.services;

import com.projektowanie.zespolowe.applicationbackend.controllers.SurveyController.FilledSurveySubmissionRequest;
import com.projektowanie.zespolowe.applicationbackend.controllers.SurveyController.SurveyRequest;
import com.projektowanie.zespolowe.applicationbackend.data.model.Answer;
import com.projektowanie.zespolowe.applicationbackend.data.model.Question;
import com.projektowanie.zespolowe.applicationbackend.data.model.QuestionOption;
import com.projektowanie.zespolowe.applicationbackend.data.model.QuestionOptionRepository;
import com.projektowanie.zespolowe.applicationbackend.data.model.QuestionRepository;
import com.projektowanie.zespolowe.applicationbackend.data.model.Survey;
import com.projektowanie.zespolowe.applicationbackend.data.model.SurveyMapper;
import com.projektowanie.zespolowe.applicationbackend.data.model.SurveyRepository;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserSubmission;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserSubmissionRepository;
import com.projektowanie.zespolowe.applicationbackend.services.util.QuestionValidator;
import com.projektowanie.zespolowe.applicationbackend.services.util.SurveyRequestValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
                })
                .toList();

        survey.setQuestions(questions);
        return surveyRepository.save(survey);
    }

    public void createSurveyResponse(FilledSurveySubmissionRequest surveySubmissionRequest) {
        Survey matchingSurvey = surveyRepository.findById(surveySubmissionRequest.surveyId())
                .orElseThrow(() -> new IllegalArgumentException("survey with this id does not exist"));

        UserSubmission userSubmission = new UserSubmission();
        userSubmission.setCreatedBy(surveySubmissionRequest.username());
        userSubmission.setSurvey(matchingSurvey);

        List<Answer> answers = surveySubmissionRequest.answers().stream().map(answerRequest -> {
            Answer singleAnswer = new Answer();
            Question question = questionRepository.findById(answerRequest.questionId())
                    .orElseThrow(() -> new IllegalArgumentException("question with the given id does not exist"));
            List<QuestionOption> selectedOptions = questionOptionRepository.findAllById(answerRequest.selectedIds());
            singleAnswer.setQuestion(question);
            singleAnswer.setSelectedOptions(selectedOptions);
            singleAnswer.setSubmission(userSubmission);
            return singleAnswer;
        }).toList();

        userSubmission.setAnswers(answers);
        userSubmissionRepository.save(userSubmission);
    }

    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    public List<Survey> getActiveSurveys() {
        return surveyRepository.findAllByIsActive(true);
    }

    public List<Survey> getInactiveSurveys() {
        return surveyRepository.findAllByIsActive(false);
    }

    public Optional<Survey> getSurveyDetails(String id) {
        return surveyRepository.findById(id);
    }
}