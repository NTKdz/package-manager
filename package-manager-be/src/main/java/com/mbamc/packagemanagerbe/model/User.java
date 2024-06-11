package com.mbamc.packagemanagerbe.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="USERNAME", length=50, nullable=false)
    private String username;

    @Column(name="NAME", length=50, nullable=false)
    private String name;

    @Column(name = "DEPARTMENT", nullable = false)
    private String department;

}