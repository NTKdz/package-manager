package com.mbamc.packagemanagerbe.service;

import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.repository.PackageRepository;
import com.mbamc.packagemanagerbe.repository.UserRepository;
import com.mbamc.packagemanagerbe.util.PackageExcelHandler;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UploadService {
    @Autowired
    private PackageRepository packageRepository;
    @Autowired
    private UserRepository userRepository;

    public void savePackage(MultipartFile file) {
        try {
            List<Package> newPackages = PackageExcelHandler.excelToPackages(file.getInputStream(), userRepository);
            packageRepository.saveAll(newPackages);
        } catch (IOException e) {
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
    }
}
