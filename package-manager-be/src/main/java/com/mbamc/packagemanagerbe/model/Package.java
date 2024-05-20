package com.mbamc.packagemanagerbe.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@Entity
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long waybill;

    private String company;

    @Enumerated(EnumType.STRING)
    private PackageStatus status;

    private String cpn;
    private String department;

    public enum PackageStatus {
        PENDING,
        PROCESSING,
        SUCCESS,
        FAILED
    }

}