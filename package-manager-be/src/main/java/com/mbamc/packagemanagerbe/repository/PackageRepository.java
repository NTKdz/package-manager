package com.mbamc.packagemanagerbe.repository;

import com.mbamc.packagemanagerbe.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {

    @Query("SELECT p FROM Package p " +
            "WHERE (cast(:date as date) IS NULL OR p.requestedDate > :date) " +
            "AND (:department IS NULL OR p.user.department = :department) " +
            "AND (:cpn IS NULL OR p.cpn = :cpn) " +
            "AND (:priority IS NULL OR p.priority = :priority) " +
            "AND (:confidentiality IS NULL OR p.confidentiality = :confidentiality)" +
            "AND (:name IS NULL OR LOWER(p.user.name) LIKE CONCAT('%', LOWER(:name), '%'))")
    List<Package> getAllPackageByCriteria(@Param("date") Date date,
                                          @Param("name") String name,
                                          @Param("department") String department,
                                          @Param("cpn") String cpn,
                                          @Param("priority") Package.Priority priority,
                                          @Param("confidentiality") Package.Confidentiality confidentiality);

    @Query("SELECT p FROM Package p " +
            "WHERE (p.user.username = :username)")
    List<Package> getAllPackageByUserName(@Param("username") String username);

    long countByUser_Department(String department);
}
