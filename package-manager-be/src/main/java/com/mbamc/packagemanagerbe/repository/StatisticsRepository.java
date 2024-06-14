package com.mbamc.packagemanagerbe.repository;

import com.mbamc.packagemanagerbe.dto.statistics.BarChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.DepartmentWithCount;
import com.mbamc.packagemanagerbe.dto.statistics.LineChartDto;
import com.mbamc.packagemanagerbe.dto.statistics.PieChartDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Repository
public interface StatisticsRepository extends JpaRepository<Package,Long> {
    @Query("SELECT new com.mbamc.packagemanagerbe.dto.statistics.DepartmentWithCount(u.department, p.requestedDate, count(u.department)) FROM User u " +
            "RIGHT JOIN Package p ON u.id = p.user.id " +
            "GROUP BY u.department, p.requestedDate ORDER BY u.department")
    List<DepartmentWithCount> getDepartmentWithTotalResult();

//    @Query("SELECT p FROM Package p " +
//            "WHERE p.requestedDate>:startDate AND p.requestedDate < :endDate")
//    List<BarChartDto> getBarChartData(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
//
//    @Query("SELECT p FROM Package p " +
//            "WHERE p.requestedDate>:startDate AND p.requestedDate < :endDate")
//    List<PieChartDto> getPieChartData(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
