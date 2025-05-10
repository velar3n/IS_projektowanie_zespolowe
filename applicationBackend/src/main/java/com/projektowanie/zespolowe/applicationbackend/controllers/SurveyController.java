package com.projektowanie.zespolowe.applicationbackend.controllers;

import com.projektowanie.zespolowe.applicationbackend.data.model.Survey;
import com.projektowanie.zespolowe.applicationbackend.services.SurveyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
public class SurveyController {

    SurveyService surveyService;

    SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping("/surveys")
    public ResponseEntity<Object> createSurvey(@RequestBody SurveyRequest surveyRequest) {
        try {
            Survey survey = surveyService.createSurveyFromRequest(surveyRequest);
            return ResponseEntity.ok(survey);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    public record ErrorResponse(String error) {}

    public record SurveyRequest(
            String title,
            String description,
            LocalDateTime startDate,
            LocalDateTime endDate,
            Optional<Boolean> isActive,
            List<QuestionRequest> questions
    ) {
    }
    public record QuestionRequest(
            String text,
            String type,
            List<String> options
    ) {
    }
}
