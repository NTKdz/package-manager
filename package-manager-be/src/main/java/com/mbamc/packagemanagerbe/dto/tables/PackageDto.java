package com.mbamc.packagemanagerbe.dto.tables;

import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PackageDto {
    private long waybill;
    private String user;
    private Date requestedDate;
    private String department;
    private String company;
    private String cpn;
    private Package.Confidentiality confidentiality;
    private Package.Priority priority;
}
