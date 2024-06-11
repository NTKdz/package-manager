package com.mbamc.packagemanagerbe.repository;

import com.mbamc.packagemanagerbe.dto.PackageDto;
import com.mbamc.packagemanagerbe.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {


    @Query("SELECT p FROM Package p " +
            "WHERE" +
            " (:date IS NULL OR p.date = :date) " +
            "AND (:department IS NULL OR p.department = :department) " +
            "AND (:cpn IS NULL OR p.cpn = :cpn) " +
            "AND (:priority IS NULL OR p.priority = :priority) " +
            "AND (:confidentiality IS NULL OR p.confidentiality = :confidentiality) "
    )
    List<PackageDto> getAllPackageByCriteria( @Param("date") Date date,
                                             @Param("department") String department, @Param("cpn") String cpn,
                                             @Param("priority") String priority,
                                             @Param("confidentiality") String confidentiality);

}
