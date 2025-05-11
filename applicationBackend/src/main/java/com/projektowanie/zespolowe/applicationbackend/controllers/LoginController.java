package com.projektowanie.zespolowe.applicationbackend.controllers;

import com.projektowanie.zespolowe.applicationbackend.data.model.User;
import com.projektowanie.zespolowe.applicationbackend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public LoginController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    /*
        * This method is used to authenticate the user and create a session.
        * Following calls to other endpoints will be authenticated based on user roles and session stored in session cookie
     */
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(), loginRequest.password());
        Authentication authenticationResponse =
                this.authenticationManager.authenticate(authenticationRequest);

        SecurityContextHolder.getContext().setAuthentication(authenticationResponse);

        HttpSession session = request.getSession(true);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest registerRequest) {
        Set<String> roles = Set.of("ROLE_USER");
        User newUser = userService.createUser(registerRequest.username(), registerRequest.password(), roles, registerRequest.email());
        return ResponseEntity.ok(newUser);
    }

    //temporary endpoint for admin testing
    @PostMapping("/registerAdmin")
    public ResponseEntity<User> registerAdmin(@RequestBody RegisterRequest registerRequest) {
        Set<String> roles = Set.of("ROLE_ADMIN","ROLE_USER");
        User newUser = userService.createUser(registerRequest.username(), registerRequest.password(), roles, registerRequest.email());
        return ResponseEntity.ok(newUser);
    }

    //Temporary endpoint for session POC
    @GetMapping("/testSession")
    public ResponseEntity<Void> testSession(HttpServletRequest request) {

        return ResponseEntity.ok().build();
    }

    public record LoginRequest(String username, String password) {
    }
    public record RegisterRequest(String username, String password, String email) {
    }

}