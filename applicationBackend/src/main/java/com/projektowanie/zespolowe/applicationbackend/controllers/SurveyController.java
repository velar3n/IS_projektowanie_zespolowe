package com.projektowanie.zespolowe.applicationbackend.controllers;

import com.projektowanie.zespolowe.applicationbackend.data.model.Survey;
import com.projektowanie.zespolowe.applicationbackend.services.SurveyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/surveys")
    public ResponseEntity<List<Survey>> getAllSurveys(@RequestParam(required = false) Boolean active) {
        List<Survey> surveys;
        if (active == null) {
            surveys = surveyService.getAllSurveys();
        } else if (active) {
            surveys = surveyService.getActiveSurveys();
        } else {
            surveys = surveyService.getInactiveSurveys();
        }
        return ResponseEntity.ok(surveys);
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
