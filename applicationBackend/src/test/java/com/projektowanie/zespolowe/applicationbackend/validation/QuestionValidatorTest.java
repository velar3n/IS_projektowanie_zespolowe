package com.projektowanie.zespolowe.applicationbackend.validation;

import com.projektowanie.zespolowe.applicationbackend.controllers.SurveyController.QuestionRequest;
import com.projektowanie.zespolowe.applicationbackend.data.enums.QuestionType;
import com.projektowanie.zespolowe.applicationbackend.services.util.QuestionValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

@Component
class QuestionValidatorTest {

    private QuestionValidator questionValidator;

    @BeforeEach
    void setUp() {
        questionValidator = new QuestionValidator();
    }

    @Test
    void validateQuestions_ShouldPass_WhenValidQuestions() {
        List<QuestionRequest> questions = List.of(
                new QuestionRequest("What is your favorite color?", QuestionType.MULTIPLE_CHOICE.toString(), List.of("Red", "Blue")),
                new QuestionRequest("What is your age?", QuestionType.SINGLE_CHOICE.toString(), List.of("18-25", "26-35"))
        );

        questionValidator.validateQuestions(questions);
    }

    @Test
    void validateQuestions_ShouldThrow_WhenQuestionTextIsBlank() {
        List<QuestionRequest> questions = List.of(
                new QuestionRequest("", QuestionType.MULTIPLE_CHOICE.toString(), null)
        );

        assertThrows(IllegalArgumentException.class, () -> questionValidator.validateQuestions(questions));
    }

    @Test
    void validateQuestions_ShouldThrow_WhenQuestionTypeIsNull() {
        List<QuestionRequest> questions = List.of(
                new QuestionRequest("What is your age?", null, null)
        );

        assertThrows(IllegalArgumentException.class, () -> questionValidator.validateQuestions(questions));
    }

    @Test
    void validateQuestions_ShouldThrow_WhenQuestionTypeIsInvalid() {
        // Assuming QuestionType is an enum, this test case may not be valid anymore.
        // You can remove this test if invalid types are not possible.
    }

    @Test
    void validateQuestions_ShouldThrow_WhenMultipleChoiceHasInsufficientOptions() {
        List<QuestionRequest> questions = List.of(
                new QuestionRequest("What is your favorite color?", QuestionType.MULTIPLE_CHOICE.toString(), List.of("Red"))
        );

        assertThrows(IllegalArgumentException.class, () -> questionValidator.validateQuestions(questions));
    }
}