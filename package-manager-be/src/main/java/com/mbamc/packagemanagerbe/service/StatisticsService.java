package com.mbamc.packagemanagerbe.service;

import com.mbamc.packagemanagerbe.converter.StatisticsConverter;
import com.mbamc.packagemanagerbe.dto.statistics.bar.BarChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.bar.PriConQuery;
import com.mbamc.packagemanagerbe.dto.statistics.line.DepartmentWithCount;
import com.mbamc.packagemanagerbe.dto.statistics.line.LineChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.line.LineChartPoint;
import com.mbamc.packagemanagerbe.dto.statistics.pie.PieChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.pie.LineChartQuery;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDate;
import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

    @Autowired
    public StatisticsService(StatisticsRepository statisticsRepository) {

        this.statisticsRepository = statisticsRepository;
    }

    public List<LineChartDto> getLineChartData() {
        List<DepartmentWithCount> departmentList = statisticsRepository.getDepartmentWithTotalResult();
        List<LineChartDto> lineChartDtos = new ArrayList<>();
        Set<String> departmentName = departmentList.stream().map(DepartmentWithCount::getDepartmentName).collect(Collectors.toSet());
        departmentName.forEach(d -> lineChartDtos.add(new LineChartDto(d, departmentList.stream()
                .filter(de -> de.getDepartmentName().equals(d))
                .map(dep -> new LineChartPoint(dep.getDate(), dep.getCount()))
                .collect(Collectors.toList()))));
        return lineChartDtos;
    }

    public List<PieChartDto> getPieChartData() {
        List<LineChartQuery> pieChartList = statisticsRepository.getPieChartData(java.sql.Date.valueOf(LocalDate.of(2001, 1, 10)),
                java.sql.Date.valueOf(LocalDate.of(2024, 10, 1)));
        return pieChartList.stream().map(StatisticsConverter::pieToDto).collect(Collectors.toList());
    }

    public List<HighestByDateDto> getHighestByDate(String type){
        return statisticsRepository.getHighestByDate(type);
    }

    public List<HighestByDepartmentByDate> getHighestByDepByDate(){
        return statisticsRepository.getHighestByDepartmentByDate();
    }
    public List<BarChartDto> getBarChartDataByPriority() {
        List<PriConQuery<Package.Priority>> priorityQueryList = statisticsRepository.getPriorityCountByType(java.sql.Date.valueOf(LocalDate.of(2001, 1, 10)),
                java.sql.Date.valueOf(LocalDate.of(2024, 10, 1)));

        List<BarChartDto> barChartDto = new ArrayList<>();
        Set<Date> dateList = priorityQueryList.stream().map(PriConQuery::getDate).collect(Collectors.toSet());

        dateList.forEach(date -> {
            Map<String, Long> priorityMap = new HashMap<>();
            priorityQueryList.stream()
                    .filter(item -> item.getDate().equals(date)).forEach((value)
                            -> priorityMap.put(String.valueOf(value.getLabel()), value.getValue()));

            barChartDto.add(new BarChartDto(date, priorityMap));
        });
        return barChartDto;
    }

    public List<BarChartDto> getBarChartDataByConfidentiality() {
        List<PriConQuery<Package.Confidentiality>> confidentialityQueryList = statisticsRepository.getConfidentialityCountByType(java.sql.Date.valueOf(LocalDate.of(2001, 1, 10)),
                java.sql.Date.valueOf(LocalDate.of(2024, 10, 1)));

        List<BarChartDto> barChartDto = new ArrayList<>();
        Set<Date> dateList = confidentialityQueryList.stream().map(PriConQuery::getDate).collect(Collectors.toSet());

        dateList.forEach(date -> {
            Map<String, Long> priorityMap = new HashMap<>();
            confidentialityQueryList.stream()
                    .filter(item -> item.getDate().equals(date)).forEach((value)
                            -> priorityMap.put(String.valueOf(value.getLabel()), value.getValue()));

            barChartDto.add(new BarChartDto(date, priorityMap));
        });
        return barChartDto;
    }
}
