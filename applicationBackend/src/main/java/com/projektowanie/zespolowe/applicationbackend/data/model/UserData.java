package com.projektowanie.zespolowe.applicationbackend.data.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserData {
  private String username;
  private String email;
  private UserInformation.Status status;
  private List<String> roles;
}
