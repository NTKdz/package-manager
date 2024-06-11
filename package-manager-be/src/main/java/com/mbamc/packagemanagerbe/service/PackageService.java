package com.mbamc.packagemanagerbe.service;

import com.mbamc.packagemanagerbe.dto.PackageDto;
import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageService{

    private final PackageRepository packageRepository;

    @Autowired
    public PackageService(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    // CREATE
    public Package createPackage(Package packageToSave) {
        return packageRepository.save(packageToSave);
    }

    // READ
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    public Package getPackageById(long id) {
        return packageRepository.findById(id)
                .orElseThrow(RuntimeException::new);
    }

    // UPDATE
    public Package updatePackage(long id, Package updatedPackage) {
        Package package1= packageRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        package1.setCpn(updatedPackage.getCpn());
        package1.setCompany(updatedPackage.getCompany());

        return packageRepository.save(package1);
    }

    // DELETE
    public void deletePackage(long id) {
        packageRepository.deleteById(id);
    }
}