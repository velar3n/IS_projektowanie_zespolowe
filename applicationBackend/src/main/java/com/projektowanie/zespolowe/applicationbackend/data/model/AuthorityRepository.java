package com.projektowanie.zespolowe.applicationbackend.data.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, String> {
  List<Authority> findByUsername(String username);
}
