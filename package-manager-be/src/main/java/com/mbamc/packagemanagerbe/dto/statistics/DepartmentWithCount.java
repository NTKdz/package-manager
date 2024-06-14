package com.mbamc.packagemanagerbe.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentWithCount {

    private String departmentName;

    private Date date;

    private Long count;

}
