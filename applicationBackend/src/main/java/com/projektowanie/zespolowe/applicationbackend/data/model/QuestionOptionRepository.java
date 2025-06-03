package com.projektowanie.zespolowe.applicationbackend.data.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption, String> {
    List<QuestionOption> findAllByQuestionId(Long questionId);
}
