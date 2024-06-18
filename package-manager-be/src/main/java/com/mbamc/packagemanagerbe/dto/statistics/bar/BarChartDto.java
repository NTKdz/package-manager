package com.mbamc.packagemanagerbe.dto.statistics.bar;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BarChartDto {
    public Date date;
    public Map<String,Long> barchartProperty;
}

