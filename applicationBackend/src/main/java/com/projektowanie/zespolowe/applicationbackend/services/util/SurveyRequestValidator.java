package com.projektowanie.zespolowe.applicationbackend.services.util;

import com.projektowanie.zespolowe.applicationbackend.controllers.SurveyController.SurveyRequest;
import org.springframework.stereotype.Component;


@Component
public class SurveyRequestValidator {

    public void validate(SurveyRequest surveyRequest) {
        if (surveyRequest.title() == null || surveyRequest.title().isBlank()) {
            throw new IllegalArgumentException("Title is required and cannot be blank.");
        }

        if (surveyRequest.startDate() == null) {
            throw new IllegalArgumentException("Start date is required.");
        }

        if (surveyRequest.endDate() == null) {
            throw new IllegalArgumentException("End date is required.");
        }

        if (surveyRequest.startDate().isAfter(surveyRequest.endDate())) {
            throw new IllegalArgumentException("Start date cannot be after end date.");
        }

        if (surveyRequest.questions() == null || surveyRequest.questions().isEmpty()) {
            throw new IllegalArgumentException("At least one question is required.");
        }
    }
}