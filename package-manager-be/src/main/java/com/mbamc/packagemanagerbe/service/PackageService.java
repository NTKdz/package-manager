package com.mbamc.packagemanagerbe.service;

import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PackageService {

    private final PackageRepository packageRepository;

    @Autowired
    public PackageService(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    // CREATE
    public Package createPackage(Package packageToSave) {
        return packageRepository.save(packageToSave);
    }

    // get
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    public List<Package> getAllPackageDecs() {
        return packageRepository.getAllPackageDecs();
    }


    public Package getPackageById(long id) {
        return packageRepository.findById(id)
                .orElseThrow(RuntimeException::new);
    }

    public Page<Package> getAllPackageByCriteria(Long waybill,
                                                 Date date,
                                                 String name,
                                                 String username,
                                                 String department,
                                                 Package.Priority priority,
                                                 Package.Confidentiality confidentiality, Pageable pageable) {
        return packageRepository.getAllPackageByCriteria(waybill, date, name == null ? "" : name, username == null ? "" : username, department, priority, confidentiality, pageable);
    }

    public List<Package> getAllPackageByUserName(String username) {
        return packageRepository.getAllPackageByUserName(username);
    }

    // UPDATE
    public Package updatePackage(long id, Package updatedPackage) {
        Package package1 = packageRepository.findById(id)
                .orElseThrow(RuntimeException::new);


        return packageRepository.save(package1);
    }

    // DELETE
    public void deletePackage(long id) {
        packageRepository.deleteById(id);
    }
}