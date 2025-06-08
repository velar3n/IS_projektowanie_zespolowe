package com.projektowanie.zespolowe.applicationbackend.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.projektowanie.zespolowe.applicationbackend.controllers.LoginController.LoginRequest;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserData;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

  private final AuthenticationManager authenticationManager;
  private final UserService userService;

  public UserData loginUser(LoginRequest loginRequest, HttpServletRequest request) throws AuthenticationException {

    Authentication authenticationRequest = UsernamePasswordAuthenticationToken
        .unauthenticated(loginRequest.username(), loginRequest.password());
    Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);

    SecurityContextHolder.getContext().setAuthentication(authenticationResponse);

    HttpSession session = request.getSession(true);
    session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

    return userService.getUserDetails(loginRequest.username());
  }
}
