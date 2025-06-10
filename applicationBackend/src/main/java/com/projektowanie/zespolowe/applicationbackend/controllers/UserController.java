package com.projektowanie.zespolowe.applicationbackend.controllers;

import com.projektowanie.zespolowe.applicationbackend.data.model.UserData;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserInformation;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserSubmission;
import com.projektowanie.zespolowe.applicationbackend.services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//Add base path
@RestController
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<UserData> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(userService.getUserDetails(userDetails.getUsername()));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserInformation>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsersInformation());
    }

    @GetMapping("/user/submissions")
    public ResponseEntity<List<UserSubmission>> getUserSubmissions(
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(userService.getUserSubmissions(userDetails.getUsername()));
    }

    @GetMapping("/user/submissions/{id}")
    public ResponseEntity<?> getUserSubmission(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String id) {
        if (userDetails == null) {
            System.out.println("CHUJ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            return ResponseEntity.ok().body(userService.getUserSubmission(userDetails.getUsername(), id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
