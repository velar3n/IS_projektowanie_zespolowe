package com.projektowanie.zespolowe.applicationbackend.data.model;

import com.projektowanie.zespolowe.applicationbackend.controllers.SurveyController.SurveyRequest;
import org.springframework.stereotype.Component;

@Component
public class SurveyMapper {

    public Survey toEntity(SurveyRequest surveyRequest) {
        return Survey.builder()
                .title(surveyRequest.title())
                .description(surveyRequest.description())
                .startDate(surveyRequest.startDate())
                .endDate(surveyRequest.endDate())
                .isActive(surveyRequest.isActive().orElse(false)) // Default to false if null
                .build();
    }
}