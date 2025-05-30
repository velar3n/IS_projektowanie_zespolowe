package com.projektowanie.zespolowe.applicationbackend.data.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "user_information")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInformation {

    @Id
    private String username; // Same as User.username

    @OneToOne
    @MapsId  // Ensures this primary key is shared with User
    @JoinColumn(name = "username")
    @JsonBackReference
    private User user;

    @Version
    private Integer version;

    @Column(name = "email")
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        ACTIVE, BLOCKED, DELETED
    }
}