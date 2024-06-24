package com.mbamc.packagemanagerbe.repository;


import com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto;
import com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDateDto;
import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.response.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface StatisticsRepository extends JpaRepository<Package, Long> {

    @Query(nativeQuery = true, value =
            "WITH time_series AS ( SELECT generate_series( " +
                    ":startDate, :endDate, " +
                    "cast(:type as integer) * INTERVAL '1 day' ) AS series_time ), intervals AS ( " +
                    "SELECT series_time, COALESCE(lead(series_time) OVER (ORDER BY series_time), (SELECT MAX(date_request) FROM packages) + INTERVAL '1 day') AS next_series_time " +
                    "FROM time_series ), package_counts AS ( " +
                    "SELECT u.department AS departmentName, i.series_time AS date, i.next_series_time AS interval_end, COUNT(p.waybill) AS countTotal " +
                    "FROM intervals i LEFT JOIN packages p ON p.date_request >= i.series_time AND p.date_request < i.next_series_time " +
                    "LEFT JOIN users u ON p.user_id = u.id GROUP BY u.department, i.series_time, i.next_series_time ), final_result AS ( " +
                    "SELECT departmentName,date,countTotal," +
                    "CEIL(CAST(countTotal AS NUMERIC) / NULLIF(EXTRACT(EPOCH FROM (interval_end - date)) / (60 * 60 * 24), 0)) AS count " +
                    "FROM package_counts WHERE departmentName IS NOT NULL) " +
                    "SELECT departmentName,date,count " +
                    "FROM final_result ORDER BY departmentName, date"
    )
    List<DepartmentWithCountInterface> getDepartmentWithTotalResult(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("type") String type);

    @Query("SELECT new com.mbamc.packagemanagerbe.response.PieChartQuery( p.user.department, p.user.department, COUNT(p.user.department)) FROM Package p " +
            "WHERE p.requestedDate >= :startDate AND p.requestedDate <= :endDate " +
            "GROUP BY p.user.department ")
    List<PieChartQuery> getPieChartData(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query(nativeQuery = true, value =
            "WITH time_series AS ( SELECT generate_series( " +
                    ":startDate, :endDate, " +
                    "cast(:type as integer) * INTERVAL '1 day' ) AS series_time ), intervals AS ( " +
                    "SELECT series_time, COALESCE(lead(series_time) OVER (ORDER BY series_time), (SELECT MAX(date_request) FROM packages) + INTERVAL '1 day') AS next_series_time " +
                    "FROM time_series ), package_counts AS ( " +
                    "SELECT i.series_time AS date, i.next_series_time AS interval_end, p.priority as label, COUNT(p.priority) AS value " +
                    "FROM intervals i " +
                    "LEFT JOIN packages p ON p.date_request >= i.series_time AND p.date_request < i.next_series_time " +
                    "WHERE p.date_request >= :startDate AND p.date_request <= :endDate " +
                    "GROUP BY i.series_time, i.next_series_time, p.priority ), final_result AS ( " +
                    "SELECT label, date, value " +
                    "FROM package_counts WHERE date IS NOT NULL ) " +
                    "SELECT label, date, value " +
                    "FROM final_result ORDER BY date"
    )
    List<PriConQueryInterface<Package.Priority>> getPriorityCountByType(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("type") String type);

    @Query(nativeQuery = true, value =
            "WITH time_series AS ( SELECT generate_series( " +
                    ":startDate, :endDate, " +
                    "cast(:type as integer) * INTERVAL '1 day' ) AS series_time ), intervals AS ( " +
                    "SELECT series_time, COALESCE(lead(series_time) OVER (ORDER BY series_time), (SELECT MAX(date_request) FROM packages) + INTERVAL '1 day') AS next_series_time " +
                    "FROM time_series ), package_counts AS ( " +
                    "SELECT i.series_time AS date, i.next_series_time AS interval_end, p.confidentiality as label, COUNT(p.confidentiality) AS value " +
                    "FROM intervals i " +
                    "LEFT JOIN packages p ON p.date_request >= i.series_time AND p.date_request < i.next_series_time " +
                    "WHERE p.date_request >= :startDate AND p.date_request <= :endDate " +
                    "GROUP BY i.series_time, i.next_series_time, p.confidentiality ), final_result AS ( " +
                    "SELECT label, date, value " +
                    "FROM package_counts WHERE date IS NOT NULL ) " +
                    "SELECT label, date, value " +
                    "FROM final_result ORDER BY date"
    )
    List<PriConQueryInterface<Package.Confidentiality>> getConfidentialityCountByType(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("type") String type);

    @Query("SELECT new com.mbamc.packagemanagerbe.dto.tables.HighestByDateDto(DATE_TRUNC(:type, p.requestedDate), count(*)) from Package p " +
            "GROUP BY 1 order by count(*) desc")
    List<HighestByDateDto> getHighestByDate(@Param("type") String type);

    @Query("SELECT new com.mbamc.packagemanagerbe.dto.tables.HighestByDepartmentByDateDto(p.user.department, count(*)) from Package p " +
            "WHERE p.requestedDate >= :startDate AND p.requestedDate<= :endDate " +
            "GROUP BY p.user.department order by count(*) desc")
    List<HighestByDepartmentByDateDto> getHighestByDepartmentByDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query(value = "SELECT COUNT(DISTINCT p.user_id) " +
            "FROM packages p " +
            "WHERE p.date_request >= :startDate " +
            "AND p.date_request <= :endDate", nativeQuery = true)
    long countUsersBetweenDates(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
