package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.converter.StatisticsConverter;
import com.mbamc.packagemanagerbe.dto.statistics.bar.BarChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.line.LineChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.pie.PieChartDto;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDateDto;
import com.mbamc.packagemanagerbe.dto.tables.UserCountDto;
import com.mbamc.packagemanagerbe.service.StatisticsService;
import com.mbamc.packagemanagerbe.util.DateHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/statistics")
@PreAuthorize("hasRole('admin')")
public class StatisticsController {
    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/line")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<LineChartDto>> getLineChart(
            @RequestParam(value = "start") LocalDate start,
            @RequestParam(value = "end") LocalDate end) {

        List<LineChartDto> lineCharts = statisticsService.getLineChartData(start, end, DateHandler.getDateTrunc(start, end));
        return ResponseEntity.ok(lineCharts.stream().map(StatisticsConverter::lineToDto).collect(Collectors.toList()));
    }

    @GetMapping("/pie")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<PieChartDto>> getPieChart(
            @RequestParam(value = "start") LocalDate start,
            @RequestParam(value = "end") LocalDate end) {
        List<PieChartDto> pieCharts = statisticsService.getPieChartData(start, end);
        return ResponseEntity.ok(pieCharts);
    }

    @GetMapping("/bar/priority")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<BarChartDto>> getBarChartByPriorityColumn(
            @RequestParam(value = "start") LocalDate start,
            @RequestParam(value = "end") LocalDate end) {
        List<BarChartDto> barCharts = statisticsService.getBarChartDataByPriority(start, end, DateHandler.getDateTrunc(start, end));
        return ResponseEntity.ok(barCharts);
    }

    @GetMapping("/bar/confi")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<BarChartDto>> getBarChartByConfiColumn(
            @RequestParam(value = "start") LocalDate start,
            @RequestParam(value = "end") LocalDate end) {
        List<BarChartDto> barCharts = statisticsService.getBarChartDataByConfidentiality(start, end, DateHandler.getDateTrunc(start, end));
        return ResponseEntity.ok(barCharts);
    }

    @GetMapping("/table/highest-packages")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<HighestByDateDto>> getHighestByDateData(@RequestParam(value = "type", required = false) String type) {
        List<HighestByDateDto> statsList = statisticsService.getHighestByDate(type != null ? type : "day");
        return ResponseEntity.ok(statsList);
    }

    @GetMapping("/table/highest-dep")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<HighestByDepartmentByDateDto>> getHighestByDepByDate(
            @RequestParam(value = "start") LocalDate start,
            @RequestParam(value = "end") LocalDate end) {
        List<HighestByDepartmentByDateDto> statsList = statisticsService.getHighestByDepByDate(start, end);
        return ResponseEntity.ok(statsList);
    }

    @GetMapping("/table/user-count")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<UserCountDto> getCountUsersBetweenDates(
            @RequestParam(value = "start") LocalDate start,
            @RequestParam(value = "end") LocalDate end) {
        Long count = statisticsService.getCountUsersBetweenDates(start, end);
        UserCountDto userCountDto = new UserCountDto(start.toString() + " / " + end.toString(), count);
        return ResponseEntity.ok(userCountDto);
    }
}
