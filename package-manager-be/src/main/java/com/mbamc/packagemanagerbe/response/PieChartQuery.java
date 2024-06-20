package com.mbamc.packagemanagerbe.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PieChartQuery {
    public String id;
    public String label;
    public Long value;
}
