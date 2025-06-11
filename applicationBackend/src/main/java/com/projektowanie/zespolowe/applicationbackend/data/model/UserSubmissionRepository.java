package com.projektowanie.zespolowe.applicationbackend.data.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSubmissionRepository extends JpaRepository<UserSubmission, String> {
    List<UserSubmission> findAllByCreatedBy(String username);

    List<UserSubmission> findAllByCreatedByAndSurveyId(String username, Long surveyId);

    List<UserSubmission> findAllBySurveyId(Long surveyId);
}
