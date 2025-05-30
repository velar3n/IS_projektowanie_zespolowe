package com.projektowanie.zespolowe.applicationbackend.data.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Answer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "submission_id")
  private UserSubmission submission;

  @ManyToOne
  @JoinColumn(name = "question_id")
  private Question question;

  @ManyToMany
  @JoinTable(name = "answer_selected_options", joinColumns = @JoinColumn(name = "answer_id"), inverseJoinColumns = @JoinColumn(name = "option_id"))
  private List<QuestionOption> selectedOptions;
}
