package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.converter.StatisticsConverter;
import com.mbamc.packagemanagerbe.dto.statistics.bar.BarChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.line.LineChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.pie.PieChartDto;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDateDto;
import com.mbamc.packagemanagerbe.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/line")
    public ResponseEntity<List<LineChartDto>> getLineChart() {
        List<LineChartDto> lineCharts = statisticsService.getLineChartData();
        return ResponseEntity.ok(lineCharts.stream().map(StatisticsConverter::lineToDto).collect(Collectors.toList()));
    }

    @GetMapping("/pie")
    public ResponseEntity<List<PieChartDto>> getPieChart() {
        List<PieChartDto> pieCharts = statisticsService.getPieChartData();
        return ResponseEntity.ok(pieCharts);
    }

    @GetMapping("/bar/priority")
    public ResponseEntity<List<BarChartDto>> getBarChartByPriorityColumn() {
        List<BarChartDto> barCharts = statisticsService.getBarChartDataByPriority();
        return ResponseEntity.ok(barCharts);
    }

    @GetMapping("/bar/confi")
    public ResponseEntity<List<BarChartDto>> getBarChartByConfiColumn() {
        List<BarChartDto> barCharts = statisticsService.getBarChartDataByConfidentiality();
        return ResponseEntity.ok(barCharts);
    }

    @GetMapping("/table/highest-packages")
    public ResponseEntity<List<HighestByDateDto>> getHighestByDateData() {
        List<HighestByDateDto> statsList = statisticsService.getHighestByDate("month");
        return ResponseEntity.ok(statsList);
    }

    @GetMapping("/table/highest-dep")
    public ResponseEntity<List<HighestByDepartmentByDateDto>> getHighestByDepByDate() {
        List<HighestByDepartmentByDateDto> statsList = statisticsService.getHighestByDepByDate();
        return ResponseEntity.ok(statsList);
    }
}
