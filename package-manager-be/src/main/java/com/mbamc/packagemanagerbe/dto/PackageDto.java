package com.mbamc.packagemanagerbe.dto;

import com.mbamc.packagemanagerbe.model.Package;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
@Data
public class PackageDto {
    private long waybill;
    private String company;
    private Package.PackageStatus status;
    private String cpn;
    private String department;
}
