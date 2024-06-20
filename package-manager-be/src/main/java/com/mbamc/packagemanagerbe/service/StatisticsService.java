package com.mbamc.packagemanagerbe.service;

import com.mbamc.packagemanagerbe.converter.StatisticsConverter;
import com.mbamc.packagemanagerbe.dto.statistics.bar.BarChartDto;
import com.mbamc.packagemanagerbe.response.PriConQuery;
import com.mbamc.packagemanagerbe.response.DepartmentWithCount;
import com.mbamc.packagemanagerbe.dto.statistics.line.LineChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.line.LineChartPoint;
import com.mbamc.packagemanagerbe.dto.statistics.pie.PieChartDto;
import com.mbamc.packagemanagerbe.response.PieChartQuery;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDateDto;
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

    public List<LineChartDto> getLineChartData(LocalDate start, LocalDate end, String type) {
        List<DepartmentWithCount> departmentList = statisticsRepository.getDepartmentWithTotalResult(java.sql.Date.valueOf(start),
                java.sql.Date.valueOf(end), type);
        List<LineChartDto> lineChartDtos = new ArrayList<>();
        Set<String> departmentName = departmentList.stream().map(DepartmentWithCount::getDepartmentName).collect(Collectors.toCollection(TreeSet::new));
        departmentName.forEach(d -> lineChartDtos.add(new LineChartDto(d, departmentList.stream()
                .filter(de -> de.getDepartmentName().equals(d))
                .map(dep -> new LineChartPoint(dep.getDate(), dep.getCount()))
                .collect(Collectors.toList()))));
        return lineChartDtos;
    }

    public List<PieChartDto> getPieChartData(LocalDate start,LocalDate end) {
        List<PieChartQuery> pieChartList = statisticsRepository.getPieChartData(java.sql.Date.valueOf(start),
                java.sql.Date.valueOf(end));
        return pieChartList.stream().map(StatisticsConverter::pieToDto).collect(Collectors.toList());
    }

    public List<HighestByDateDto> getHighestByDate(String type) {
        return statisticsRepository.getHighestByDate(type);
    }

    public List<HighestByDepartmentByDateDto> getHighestByDepByDate() {
        return statisticsRepository.getHighestByDepartmentByDate();
    }

    public List<BarChartDto> getBarChartDataByPriority(LocalDate start,LocalDate end,String type) {
        List<PriConQuery<Package.Priority>> priorityQueryList = statisticsRepository.getPriorityCountByType(java.sql.Date.valueOf(start),
                java.sql.Date.valueOf(end), type);

        List<BarChartDto> barChartDto = new ArrayList<>();
        Set<Date> dateList = priorityQueryList.stream().map(PriConQuery::getDate).collect(Collectors.toCollection(TreeSet::new));

        dateList.forEach(date -> {
            Map<String, Long> priorityMap = new HashMap<>();
            priorityQueryList.stream()
                    .filter(item -> item.getDate().equals(date)).forEach((value)
                            -> priorityMap.put(String.valueOf(value.getLabel()), value.getValue()));

            barChartDto.add(new BarChartDto(date, priorityMap));
        });
        return barChartDto;
    }

    public List<BarChartDto> getBarChartDataByConfidentiality(LocalDate start,LocalDate end,String type) {
        List<PriConQuery<Package.Confidentiality>> confidentialityQueryList = statisticsRepository
                .getConfidentialityCountByType(java.sql.Date.valueOf(start),
                        java.sql.Date.valueOf(end), type);

        List<BarChartDto> barChartDto = new ArrayList<>();
        Set<Date> dateList = confidentialityQueryList.stream().map(PriConQuery::getDate).collect(Collectors.toCollection(TreeSet::new));

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
