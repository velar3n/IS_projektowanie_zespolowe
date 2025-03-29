package com.projektowanie.zespolowe.applicationbackend.data.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "authorities")
@IdClass(AuthorityId.class)  // Defines composite key
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Authority {

    @Id
    @Column(name = "username", nullable = false)
    private String username;

    @Id
    @Column(name = "authority", nullable = false)
    private String authority;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "username", referencedColumnName = "username", insertable = false, updatable = false)
    private User user;
}