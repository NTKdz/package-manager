package com.mbamc.packagemanagerbe.dto.statistics.line;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentWithCount {

    public String departmentName;

    public Date date;

    public Long count;

}
