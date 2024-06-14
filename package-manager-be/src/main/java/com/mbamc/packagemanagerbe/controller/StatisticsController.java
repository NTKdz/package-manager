package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.converter.PackageConverter;
import com.mbamc.packagemanagerbe.dto.statistics.LineChartDto;
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
        return ResponseEntity.ok(lineCharts);
    }
}
