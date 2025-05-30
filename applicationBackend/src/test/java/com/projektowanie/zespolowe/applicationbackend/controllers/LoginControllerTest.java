package com.projektowanie.zespolowe.applicationbackend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projektowanie.zespolowe.applicationbackend.data.model.User;
import com.projektowanie.zespolowe.applicationbackend.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Set;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class LoginControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setupMocks() {
        MockitoAnnotations.openMocks(this);
    }

    private MockMvc buildMockMvc(LoginController controller) {
        return MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void login_Success() throws Exception {
        // Arrange
        Authentication mockAuthentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any())).thenReturn(mockAuthentication);

        LoginController controller = new LoginController(authenticationManager, userService);
        MockMvc mockMvc = buildMockMvc(controller);

        LoginController.LoginRequest loginRequest = new LoginController.LoginRequest("testUser", "password");

        // Act & Assert
        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk());
    }

    @Test
    void login_InvalidCredentials() throws Exception {
        // Arrange
        doThrow(new AuthenticationException("Invalid credentials") {
        }).when(authenticationManager).authenticate(any());

        LoginController controller = new LoginController(authenticationManager, userService);
        MockMvc mockMvc = buildMockMvc(controller);

        LoginController.LoginRequest loginRequest = new LoginController.LoginRequest("invalidUser", "wrongPassword");

        // Act & Assert
        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void register_Success() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setUsername("newUser");

        when(userService.createUser(
                eq("newUser"),
                eq("password"),
                eq(Set.of("ROLE_USER")),
                eq("newUser@example.com")
        )).thenReturn(mockUser);

        LoginController controller = new LoginController(authenticationManager, userService);
        MockMvc mockMvc = buildMockMvc(controller);

        LoginController.RegisterRequest request = new LoginController.RegisterRequest("newUser", "password", "newUser@example.com");

        // Act & Assert
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void register_UserAlreadyExists() throws Exception {
        // Arrange
        doThrow(new ObjectOptimisticLockingFailureException(User.class, "User already exists"))
                .when(userService).createUser(anyString(), anyString(), anySet(), anyString());

        LoginController controller = new LoginController(authenticationManager, userService);
        MockMvc mockMvc = buildMockMvc(controller);

        LoginController.RegisterRequest request = new LoginController.RegisterRequest("existingUser", "password", "existingUser@example.com");

        // Act & Assert
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }

    @Test
    void registerAdmin_Success() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setUsername("adminUser");

        when(userService.createUser(
                eq("adminUser"),
                eq("password"),
                eq(Set.of("ROLE_ADMIN", "ROLE_USER")),
                eq("adminUser@example.com")
        )).thenReturn(mockUser);

        LoginController controller = new LoginController(authenticationManager, userService);
        MockMvc mockMvc = buildMockMvc(controller);

        LoginController.RegisterRequest request = new LoginController.RegisterRequest("adminUser", "password", "adminUser@example.com");

        // Act & Assert
        mockMvc.perform(post("/registerAdmin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void registerAdmin_UserAlreadyExists() throws Exception {
        // Arrange
        doThrow(new ObjectOptimisticLockingFailureException(User.class, "User already exists"))
                .when(userService).createUser(anyString(), anyString(), anySet(), anyString());

        LoginController controller = new LoginController(authenticationManager, userService);
        MockMvc mockMvc = buildMockMvc(controller);

        LoginController.RegisterRequest request = new LoginController.RegisterRequest("existingAdmin", "password", "existingAdmin@example.com");

        // Act & Assert
        mockMvc.perform(post("/registerAdmin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }
}