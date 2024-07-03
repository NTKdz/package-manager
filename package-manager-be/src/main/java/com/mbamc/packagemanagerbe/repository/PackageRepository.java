package com.mbamc.packagemanagerbe.repository;

import com.mbamc.packagemanagerbe.model.Package;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {

    @Query("SELECT p FROM Package p " +
            "WHERE (cast(:date as date) IS NULL OR p.requestedDate = :date) " +
            "AND (:waybill IS NULL OR p.waybill = :waybill) " +
            "AND (:department IS NULL OR p.user.department = :department) " +
            "AND (:priority IS NULL OR p.priority = :priority) " +
            "AND (:confidentiality IS NULL OR p.confidentiality = :confidentiality) " +
            "AND (:name IS NULL OR (LOWER(p.user.name) LIKE CONCAT('%', LOWER(:name), '%'))) " +
            "AND (:username IS NULL OR (p.user.username LIKE CONCAT('%', :username, '%'))) " +
            "ORDER BY p.waybill desc ")
    Page<Package> getAllPackageByCriteria(
            @Param("waybill") Long waybill,
            @Param("date") Date date,
            @Param("name") String name,
            @Param("username") String username,
            @Param("department") String department,
            @Param("priority") Package.Priority priority,
            @Param("confidentiality") Package.Confidentiality confidentiality, Pageable pageable);

    @Query("SELECT p FROM Package p " +
            "WHERE (p.user.username = :username)")
    List<Package> getAllPackageByUserName(@Param("username") String username);

    @Query("select p from Package p " +
            "where (cast(:startDate as date ) is null or p.requestedDate >= :startDate) "+
            "And (cast(:endDate as date ) is null or p.requestedDate <= :endDate) "+
            "order by p.waybill desc ")
    List<Package> getAllPackageDecs(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
