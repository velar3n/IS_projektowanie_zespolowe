package com.projektowanie.zespolowe.applicationbackend.data.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class SurveyResultsResponse {
    public record SingleOptionResult(
            Long id,
            String text,
            Long count) {
    }

    public record SingleQuestionResult(Long id, String text, List<SingleOptionResult> results) {
    }

    @JsonIgnoreProperties({ "questions" })
    private Survey survey;
    private List<SingleQuestionResult> questions;
}