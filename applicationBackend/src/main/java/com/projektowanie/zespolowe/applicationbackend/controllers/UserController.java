package com.projektowanie.zespolowe.applicationbackend.controllers;

import com.projektowanie.zespolowe.applicationbackend.data.model.User;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserInformation;
import com.projektowanie.zespolowe.applicationbackend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<User> getUser(@RequestParam String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @GetMapping("/user/roles")
    public ResponseEntity<List<String>> getUserRoles(@RequestParam String username) {
        return ResponseEntity.ok(userService.getUserAuthorities(username));
    }

    @GetMapping("/user/information")
    public ResponseEntity<UserInformation> getUserInformation(@RequestParam String username) {
        return ResponseEntity.ok(userService.getUserInformationByUsername(username));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserInformation>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsersInformation());
    }


}
