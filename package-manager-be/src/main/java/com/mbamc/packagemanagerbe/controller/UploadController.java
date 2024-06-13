package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.service.PackageService;
import com.mbamc.packagemanagerbe.service.UploadService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
public class UploadController {
    PackageService packageService;
    UploadService uploadService;

    @Autowired
    public UploadController(PackageService packageService, UploadService uploadService) {
        this.packageService = packageService;
        this.uploadService=uploadService;
    }

    @PostMapping("/packages")
    public ResponseEntity<String> uploadPackageExcel(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            uploadService.savePackage(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            e.printStackTrace();
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }

    }
}
