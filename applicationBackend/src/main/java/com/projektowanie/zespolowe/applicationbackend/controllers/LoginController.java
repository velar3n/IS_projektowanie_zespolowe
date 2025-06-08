package com.projektowanie.zespolowe.applicationbackend.controllers;

import com.projektowanie.zespolowe.applicationbackend.data.model.User;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserData;
import com.projektowanie.zespolowe.applicationbackend.services.LoginService;
import com.projektowanie.zespolowe.applicationbackend.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final UserService userService;
    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
            UserData userData = loginService.loginUser(loginRequest, request);
            return ResponseEntity.ok(userData);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            Set<String> roles = Set.of("ROLE_USER");
            User newUser = userService.createUser(registerRequest.username(), registerRequest.password(), roles,
                    registerRequest.email());
            return ResponseEntity.ok(newUser);
        } catch (ObjectOptimisticLockingFailureException e) {
            return ResponseEntity.status(409).body("Conflict: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    // temporary endpoint for admin testing
    @PostMapping("/registerAdmin")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest registerRequest) {
        try {
            Set<String> roles = Set.of("ROLE_ADMIN", "ROLE_USER");
            User newUser = userService.createUser(registerRequest.username(), registerRequest.password(), roles,
                    registerRequest.email());
            return ResponseEntity.ok(newUser);
        } catch (ObjectOptimisticLockingFailureException e) {
            return ResponseEntity.status(409).body("Conflict: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    // Temporary endpoint for session POC
    @GetMapping("/testSession")
    public ResponseEntity<Void> testSession(HttpServletRequest request) {

        return ResponseEntity.ok().build();
    }

    public record LoginRequest(String username, String password) {
    }

    public record RegisterRequest(String username, String password, String email) {
    }

}