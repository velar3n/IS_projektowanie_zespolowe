package com.projektowanie.zespolowe.applicationbackend.data.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInformationRepository extends JpaRepository<UserInformation, String> {
    UserInformation findUserInformationByUsername(String username);
}
