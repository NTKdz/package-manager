package com.mbamc.packagemanagerbe.dto.statistics.pie;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LineChartQuery {
    public String id;
    public String label;
    public Long value;
}
