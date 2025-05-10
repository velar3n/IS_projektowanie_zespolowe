package com.projektowanie.zespolowe.applicationbackend.services.util;

import com.projektowanie.zespolowe.applicationbackend.controllers.SurveyController;
import com.projektowanie.zespolowe.applicationbackend.data.enums.QuestionType;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionValidator {

    public void validateQuestions(List<SurveyController.QuestionRequest> questions) {
        for (SurveyController.QuestionRequest question : questions) {
            if (question.text() == null || question.text().isBlank()) {
                throw new IllegalArgumentException("Question text cannot be blank.");
            }

            if (question.type() == null || !isValidQuestionType(question.type())) {
                throw new IllegalArgumentException("Invalid question type: " + question.type());
            }

            if (question.options() == null || question.options().size() < 2) {
                throw new IllegalArgumentException("All questions must have at least two options.");
            }
        }
    }

    private boolean isValidQuestionType(String type) {
        for (QuestionType questionType : QuestionType.values()) {
            if (questionType.toString().equals(type)) {
                return true;
            }
        }
        return false;
    }
}