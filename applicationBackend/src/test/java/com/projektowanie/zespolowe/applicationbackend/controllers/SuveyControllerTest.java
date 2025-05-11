package com.projektowanie.zespolowe.applicationbackend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projektowanie.zespolowe.applicationbackend.data.model.Question;
import com.projektowanie.zespolowe.applicationbackend.data.model.Survey;
import com.projektowanie.zespolowe.applicationbackend.services.SurveyService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SurveyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private SurveyService surveyService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void createSurvey_Success() throws Exception {
        // Arrange
        SurveyController.SurveyRequest request = new SurveyController.SurveyRequest(
                "Test Survey",
                "This is a test survey",
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(1),
                Optional.of(true),
                List.of(new SurveyController.QuestionRequest(
                        "What is your favorite color?",
                        "MULTIPLE-CHOICE",
                        List.of("Red", "Green", "Blue")
                ))
        );

        Survey survey = Survey.builder()
                .title(request.title())
                .description(request.description())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .isActive(true)
                .build();

        Question question = Question.builder()
                .text(request.questions().get(0).text())
                .type(request.questions().get(0).type())
                .options(request.questions().get(0).options())
                .survey(survey)
                .build();

        survey.setQuestions(List.of(question));

        System.out.println("Survey: " + objectMapper.writeValueAsString(survey));

        when(surveyService.createSurveyFromRequest(request)).thenReturn(survey);

        // Act & Assert
        mockMvc.perform(post("/surveys")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Survey"));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void createSurvey_InvalidInput() throws Exception {
        // Arrange
        SurveyController.SurveyRequest request = new SurveyController.SurveyRequest(
                null, // Missing title
                "This is a test survey",
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(1),
                Optional.of(true),
                List.of(new SurveyController.QuestionRequest(
                        "What is your favorite color?",
                        "multiple_choice",
                        List.of("Red", "Green", "Blue")
                ))
        );

        // Act & Assert
        mockMvc.perform(post("/surveys")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void createSurvey_NonAdmin_Forbidden() throws Exception {
        // Arrange
        SurveyController.SurveyRequest request = new SurveyController.SurveyRequest(
                "Test Survey",
                "This is a test survey",
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(1),
                Optional.of(true),
                List.of(new SurveyController.QuestionRequest(
                        "What is your favorite color?",
                        "MULTIPLE-CHOICE",
                        List.of("Red", "Green", "Blue")
                ))
        );

        // Act & Assert
        mockMvc.perform(post("/surveys")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void getAllSurveys_Success() throws Exception {
        // Arrange
        Survey survey1 = Survey.builder()
                .title("Survey 1")
                .description("Description 1")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(1))
                .isActive(true)
                .build();

        Survey survey2 = Survey.builder()
                .title("Survey 2")
                .description("Description 2")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(2))
                .isActive(true)
                .build();

        when(surveyService.getAllSurveys()).thenReturn(List.of(survey1, survey2));

        // Act & Assert
        //extend this one
        mockMvc.perform(get("/surveys")
                        .param("active", "true"))
                .andExpect(status().isOk());
    }
}