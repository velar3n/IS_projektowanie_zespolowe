package com.projektowanie.zespolowe.applicationbackend.controllers;

import com.projektowanie.zespolowe.applicationbackend.data.model.Survey;
import com.projektowanie.zespolowe.applicationbackend.services.SurveyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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

    @GetMapping("/surveys/{id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable String id) {
        Optional<Survey> matchingSurvey = surveyService.getSurveyDetails(id);
        if (matchingSurvey.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(matchingSurvey.get());
        }
    }

    @PostMapping("/surveys/{id}")
    public ResponseEntity<?> postSurveyAnswer(
            @PathVariable String id,
            @RequestBody List<SingleQuestionAnswer> submissionRequest,
            @AuthenticationPrincipal UserDetails user) {
        try {
            Optional<String> username = Optional.empty();
            if (user != null) {
                username = Optional.of(user.getUsername());
            }
            surveyService.createSurveyResponse(id, submissionRequest, username);
            return ResponseEntity.ok().build();
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

    public record ErrorResponse(String error) {
    }

    public record SurveyRequest(
            String title,
            String description,
            LocalDateTime startDate,
            LocalDateTime endDate,
            Optional<Boolean> isActive,
            List<QuestionRequest> questions) {
    }

    public record QuestionRequest(
            String text,
            String type,
            List<String> options) {
    }

    public record SingleQuestionAnswer(
            String questionId,
            List<String> selectedIds) {
    }

}
