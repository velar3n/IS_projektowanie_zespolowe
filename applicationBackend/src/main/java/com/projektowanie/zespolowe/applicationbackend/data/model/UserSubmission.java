package com.projektowanie.zespolowe.applicationbackend.data.model;

import java.util.List;

import org.springframework.data.annotation.CreatedBy;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserSubmission {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @CreatedBy
  @Column(name = "created_by", nullable = true)
  private String createdBy;

  @ManyToOne
  @JoinColumn(name = "survey_id")
  private Survey survey;

  @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Answer> answers;

}
