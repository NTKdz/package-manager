package com.mbamc.packagemanagerbe.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "PACKAGES")
public class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long waybill;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @Column(name = "DATE", nullable = false)
    private Date date;

    @Column(name = "COMPANY", nullable = false)
    private String company;

    @Column(name = "CPN", nullable = false)
    private String cpn;

    @Enumerated(EnumType.STRING)
    @Column(name = "PRIORITY", nullable = false)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "CONFIDENTIALITY", nullable = false)
    private Confidentiality confidentiality;

    public enum Confidentiality {
        NORMAL,
        CONFIDENTIAL
    }

    public enum Priority {
        NORMAL,
        FAST,
        URGENT,
        VERY_URGENT
    }
}