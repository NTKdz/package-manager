package com.mbamc.packagemanagerbe.converter;

import com.mbamc.packagemanagerbe.dto.statistics.line.LineChartDto;
import com.mbamc.packagemanagerbe.response.LineChartQuery;
import com.mbamc.packagemanagerbe.dto.statistics.pie.PieChartDto;

public class StatisticsConverter {
    public static LineChartDto lineToDto(LineChartDto lineChartDto){
        LineChartDto newLineChartDto=new LineChartDto();
        newLineChartDto.setId(lineChartDto.getId());
        newLineChartDto.setData(lineChartDto.getData());
        return newLineChartDto;
    }

    public static PieChartDto pieToDto(LineChartQuery query){
        PieChartDto newPieChartDto = new PieChartDto();
        newPieChartDto.setId(query.getId());
        newPieChartDto.setValue(query.getValue());
        newPieChartDto.setLabel(query.getLabel());
        return newPieChartDto;
    }

//    public static BarChartDto barToDto(PriConQuery query){
//        BarChartDto newBarChartDto = new BarChartDto();
//        Map<String,String> property= new HashMap<>();
//
//        newBarChartDto.setDate(query.getDate());
//        newBarChartDto.setBarchartProperty();
//    }
}
