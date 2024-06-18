package com.mbamc.packagemanagerbe.dto.tables;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class HighestByDateDto {
    public Date date;
    public Long count;
}
