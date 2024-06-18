package com.mbamc.packagemanagerbe.dto.statistics.pie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PieChartDto {
    String id;
    String label;
    Long value;
}
