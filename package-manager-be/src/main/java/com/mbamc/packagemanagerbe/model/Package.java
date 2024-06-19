package com.mbamc.packagemanagerbe.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;

@Setter
@Getter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "PACKAGES")
public class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long waybill;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "date_request", nullable = false)
    private Date requestedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "PRIORITY", nullable = false)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "CONFIDENTIALITY", nullable = false)
    private Confidentiality confidentiality;

    public enum Confidentiality {
        BINH_THUONG,
        MAT
    }

    public enum Priority {
        BINH_THUONG,
        HOA_TOC,
        KHAN,
        THUONG_KHAN
    }
}