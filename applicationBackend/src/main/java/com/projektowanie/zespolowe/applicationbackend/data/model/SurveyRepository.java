package com.projektowanie.zespolowe.applicationbackend.data.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, String> {
    List<Survey> findAllByIsPublic(boolean b);
}
