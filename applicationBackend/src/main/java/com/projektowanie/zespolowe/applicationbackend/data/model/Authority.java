package com.projektowanie.zespolowe.applicationbackend.data.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.projektowanie.zespolowe.applicationbackend.data.enums.UserAuthority;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "authorities")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "authority", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserAuthority authority;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "username", referencedColumnName = "username", insertable = false, updatable = false)
    private User user;
}