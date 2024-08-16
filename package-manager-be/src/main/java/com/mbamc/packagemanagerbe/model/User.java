package com.mbamc.packagemanagerbe.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    @Column(name = "DEPARTMENT",length=50)
    private String department;

    @Column(name = "COMPANY", nullable = false)
    private String company;
}
