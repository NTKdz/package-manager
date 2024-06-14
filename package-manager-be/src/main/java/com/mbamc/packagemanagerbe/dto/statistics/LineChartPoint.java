package com.mbamc.packagemanagerbe.dto.statistics;

import lombok.AllArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class LineChartPoint {
    Date date;
    Long count;
}
