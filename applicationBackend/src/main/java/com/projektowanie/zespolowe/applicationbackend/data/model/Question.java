package com.projektowanie.zespolowe.applicationbackend.data.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "survey_question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "type", nullable = false)
    private String type; // MULTIPLE_CHOICE or SINGLE_CHOICE

    @ElementCollection
    @CollectionTable(name = "survey_question_option", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "options", nullable = false)
    private List<String> options;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "survey_id", nullable = false)
    private Survey survey;
}
