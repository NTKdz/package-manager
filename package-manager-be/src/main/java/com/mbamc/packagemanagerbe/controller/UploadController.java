package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.service.PackageService;
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

    @Autowired
    public UploadController(PackageService packageService) {
        this.packageService = packageService;
    }

    @PostMapping("/packages")
    public void uploadPackageExcel(@RequestParam("file") MultipartFile file){
        String message = "";
        try {
            fileService.save(file);

        }
}
