package com.mbamc.packagemanagerbe.repository;

import com.mbamc.packagemanagerbe.dto.statistics.bar.PriConQuery;
import com.mbamc.packagemanagerbe.dto.statistics.line.DepartmentWithCount;

import com.mbamc.packagemanagerbe.dto.statistics.pie.LineChartQuery;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDate;
import com.mbamc.packagemanagerbe.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface StatisticsRepository extends JpaRepository<Package,Long> {
    @Query("SELECT new com.mbamc.packagemanagerbe.dto.statistics.line.DepartmentWithCount(u.department, p.requestedDate, count(u.department)) FROM User u " +
            "RIGHT JOIN Package p ON u.id = p.user.id " +
            "GROUP BY u.department, p.requestedDate ORDER BY u.department")
    List<DepartmentWithCount> getDepartmentWithTotalResult();

    @Query("SELECT new com.mbamc.packagemanagerbe.dto.statistics.pie.LineChartQuery(p.user.department, p.user.department, COUNT(p.user.department)) FROM Package p " +
            "WHERE p.requestedDate >= :startDate AND p.requestedDate <= :endDate " +
            "GROUP BY p.user.department")
    List<LineChartQuery> getPieChartData(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT new com.mbamc.packagemanagerbe.dto.statistics.bar.PriConQuery(p.requestedDate, p.priority, COUNT(p.priority)) FROM Package p " +
            "WHERE p.requestedDate >= :startDate AND p.requestedDate <= :endDate " +
            "GROUP BY p.priority,p.requestedDate ORDER BY p.requestedDate")
    List<PriConQuery<Package.Priority>> getPriorityCountByType(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT new com.mbamc.packagemanagerbe.dto.statistics.bar.PriConQuery(p.requestedDate, p.confidentiality, COUNT(p.confidentiality)) FROM Package p " +
            "WHERE p.requestedDate >= :startDate AND p.requestedDate <= :endDate " +
            "GROUP BY p.confidentiality,p.requestedDate ORDER BY p.requestedDate")
    List<PriConQuery<Package.Confidentiality>> getConfidentialityCountByType(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT new com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto(DATE_TRUNC(:type, p.requestedDate), count(*)) from Package p " +
    "group by 1 order by count(*) desc")
    List<HighestByDateDto> getHighestByDate(@Param("type") String type);

    @Query("SELECT new com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDate(p.user.department, count(*)) from Package p " +
            "group by 1 order by count(*) desc")
    List<HighestByDepartmentByDate> getHighestByDepartmentByDate();
}
