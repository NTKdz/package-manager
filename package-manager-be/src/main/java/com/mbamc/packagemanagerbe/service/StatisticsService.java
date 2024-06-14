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
        int index = 0;
        for (DepartmentWithCount department : departmentList) {
            LineChartDto dto = new LineChartDto();
            if (Objects.equals(department.getDepartmentName(), departmentList.get(index--).getDepartmentName()) || index == 0) {
                lineChartDtos.get(lineChartDtos.size() - 1).getData().add(new LineChartPoint("department.getDate()", department.getCount()));
            } else {
                dto.setId(department.getDepartmentName());
                dto.getData().add(new LineChartPoint("department.getDate()", department.getCount()));
                lineChartDtos.add(dto);
            }
            index++;
        }
        return lineChartDtos;
    }
}
