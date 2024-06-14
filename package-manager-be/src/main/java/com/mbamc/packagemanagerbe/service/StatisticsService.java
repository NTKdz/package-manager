package com.mbamc.packagemanagerbe.service;

import com.mbamc.packagemanagerbe.dto.statistics.DepartmentWithCount;
import com.mbamc.packagemanagerbe.dto.statistics.LineChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.LineChartPoint;
import com.mbamc.packagemanagerbe.repository.PackageRepository;
import com.mbamc.packagemanagerbe.repository.StatisticsRepository;
import com.mbamc.packagemanagerbe.repository.UserRepository;
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
}
