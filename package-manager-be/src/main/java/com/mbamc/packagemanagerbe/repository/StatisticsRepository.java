package com.mbamc.packagemanagerbe.repository;


import com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDateDto;
import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.response.DepartmentWithCount;
import com.mbamc.packagemanagerbe.response.PieChartQuery;
import com.mbamc.packagemanagerbe.response.PriConQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface StatisticsRepository extends JpaRepository<Package, Long> {
    @Query("SELECT new com.mbamc.packagemanagerbe.response.DepartmentWithCount( p.user.department, DATE_TRUNC(:type, p.requestedDate), count(*)) " +
            "FROM Package p " +
            "WHERE p.requestedDate >= :startDate AND p.requestedDate <= :endDate " +
            "GROUP BY p.user.department, 2 " +
            "ORDER BY p.user.department")
    List<DepartmentWithCount> getDepartmentWithTotalResult(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("type") String type);

    @Query("SELECT new com.mbamc.packagemanagerbe.response.PieChartQuery( p.user.department, p.user.department, COUNT(p.user.department)) FROM Package p " +
            "WHERE p.requestedDate >= :startDate AND p.requestedDate <= :endDate " +
            "GROUP BY p.user.department ")
    List<PieChartQuery> getPieChartData(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT new com.mbamc.packagemanagerbe.response.PriConQuery(DATE_TRUNC(:type, p.requestedDate), p.priority, COUNT(p.priority)) FROM Package p " +
            "WHERE p.requestedDate >= :startDate AND p.requestedDate <= :endDate " +
            "GROUP BY p.priority, p.requestedDate ORDER BY p.requestedDate")
    List<PriConQuery<Package.Priority>> getPriorityCountByType(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("type") String type);

    @Query("SELECT new com.mbamc.packagemanagerbe.response.PriConQuery(DATE_TRUNC(:type, p.requestedDate), p.confidentiality, COUNT(p.confidentiality)) FROM Package p " +
            "WHERE p.requestedDate >= :startDate AND p.requestedDate <= :endDate " +
            "GROUP BY p.confidentiality, p.requestedDate ORDER BY p.requestedDate")
    List<PriConQuery<Package.Confidentiality>> getConfidentialityCountByType(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("type") String type);

    @Query("SELECT new com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto(DATE_TRUNC(:type, p.requestedDate), count(*)) from Package p " +
            "group by 1 order by count(*) desc")
    List<HighestByDateDto> getHighestByDate(@Param("type") String type);

    @Query("SELECT new com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDateDto(p.user.department, count(*)) from Package p " +
            "group by p.user.department order by count(*) desc")
    List<HighestByDepartmentByDateDto> getHighestByDepartmentByDate();
}
