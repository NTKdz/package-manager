package com.mbamc.packagemanagerbe.dto;

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
    private String username;
    private Date date;
    private String company;
    private String cpn;
    private String department;
    private Package.Confidentiality confidentiality;
    private Package.Confidentiality priority;

}
