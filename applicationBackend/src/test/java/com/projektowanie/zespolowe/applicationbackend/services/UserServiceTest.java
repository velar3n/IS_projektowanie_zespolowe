package com.projektowanie.zespolowe.applicationbackend.services;

import com.projektowanie.zespolowe.applicationbackend.data.model.User;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserRepository;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserInformationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserInformationRepository userInformationRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser_Success() {
        // Arrange
        String username = "testUser";
        String password = "password";
        String email = "test@example.com";
        Set<String> roles = Set.of("ROLE_USER");

        when(userRepository.existsById(username)).thenReturn(false);
        when(passwordEncoder.encode(password)).thenReturn("encodedPassword");

        // Act
        User createdUser = userService.createUser(username, password, roles, email);

        // Assert
        assertNotNull(createdUser);
        assertEquals(username, createdUser.getUsername());
        assertEquals("encodedPassword", createdUser.getPassword());
        assertTrue(createdUser.isEnabled());
        verify(userRepository, times(1)).save(createdUser);
    }

    @Test
    void testCreateUser_UserAlreadyExists() {
        // Arrange
        String username = "existingUser";
        when(userRepository.existsById(username)).thenReturn(true);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                userService.createUser(username, "password", Set.of("ROLE_USER"), "email@example.com"));
        assertEquals("User with username 'existingUser' already exists.", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void testGetUserByUsername_UserExists() {
        // Arrange
        String username = "testUser";
        User user = new User();
        user.setUsername(username);
        when(userRepository.findById(username)).thenReturn(Optional.of(user));

        // Act
        User foundUser = userService.getUserByUsername(username);

        // Assert
        assertNotNull(foundUser);
        assertEquals(username, foundUser.getUsername());
    }

    @Test
    void testGetUserByUsername_UserDoesNotExist() {
        // Arrange
        String username = "nonExistentUser";
        when(userRepository.findById(username)).thenReturn(Optional.empty());

        // Act
        User foundUser = userService.getUserByUsername(username);

        // Assert
        assertNull(foundUser);
    }
}