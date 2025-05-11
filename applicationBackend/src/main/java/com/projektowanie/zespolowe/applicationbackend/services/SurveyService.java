package com.projektowanie.zespolowe.applicationbackend.services;

import com.projektowanie.zespolowe.applicationbackend.controllers.SurveyController.SurveyRequest;
import com.projektowanie.zespolowe.applicationbackend.data.model.Question;
import com.projektowanie.zespolowe.applicationbackend.data.model.Survey;
import com.projektowanie.zespolowe.applicationbackend.data.model.SurveyMapper;
import com.projektowanie.zespolowe.applicationbackend.data.model.SurveyRepository;
import com.projektowanie.zespolowe.applicationbackend.services.util.QuestionValidator;
import com.projektowanie.zespolowe.applicationbackend.services.util.SurveyRequestValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final SurveyRequestValidator surveyRequestValidator;
    private final SurveyMapper surveyMapper;
    private final QuestionValidator questionValidator;

    public Survey createSurveyFromRequest(SurveyRequest surveyRequest) {
        surveyRequestValidator.validate(surveyRequest);
        Survey survey = surveyMapper.toEntity(surveyRequest);
        questionValidator.validateQuestions(surveyRequest.questions());
        List<Question> questions = surveyRequest.questions().stream()
                .map(questionRequest -> Question.builder()
                        .text(questionRequest.text())
                        .type(questionRequest.type())
                        .options(questionRequest.options())
                        .survey(survey)
                        .build())
                .toList();
        survey.setQuestions(questions);
        return surveyRepository.save(survey);
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
}