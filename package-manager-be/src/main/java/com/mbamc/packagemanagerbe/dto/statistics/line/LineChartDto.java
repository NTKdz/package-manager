package com.mbamc.packagemanagerbe.dto.statistics.line;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LineChartDto {
    public String id;
    public List<LineChartPoint> data;
}
