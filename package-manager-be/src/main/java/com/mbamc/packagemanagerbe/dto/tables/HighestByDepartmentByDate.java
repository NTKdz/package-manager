package com.mbamc.packagemanagerbe.dto.tables;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HighestByDepartmentByDate {
    public String depName;
    public Long count;
}
