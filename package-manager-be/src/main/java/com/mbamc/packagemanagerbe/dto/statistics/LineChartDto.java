package com.mbamc.packagemanagerbe.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LineChartDto {
    String id;
    List<LineChartPoint> data;
}
