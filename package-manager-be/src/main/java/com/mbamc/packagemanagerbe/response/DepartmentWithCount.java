package com.mbamc.packagemanagerbe.response;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentWithCount {
    public String departmentName;
    public Date date;
    public Long count;
}

