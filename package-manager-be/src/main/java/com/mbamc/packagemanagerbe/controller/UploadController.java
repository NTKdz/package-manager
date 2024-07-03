package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.service.PackageService;
import com.mbamc.packagemanagerbe.service.UploadService;
import com.mbamc.packagemanagerbe.util.PackageExcelHandler;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/upload")
public class UploadController {
    PackageService packageService;
    UploadService uploadService;

    @Autowired
    public UploadController(PackageService packageService, UploadService uploadService) {
        this.packageService = packageService;
        this.uploadService = uploadService;
    }

    @PostMapping("/import-excel")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<String> uploadPackageExcel(@RequestParam("file") MultipartFile file) {
        String message = "";
        if (!Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            message = "Invalid file type. Please upload an Excel file (.xlsx).";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

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

    @GetMapping("/export-to-excel")
    @PreAuthorize("hasRole('admin')")
    public void exportIntoExcelFile(@RequestParam(value = "startDate", required = false) Date startDate,
                                    @RequestParam(value = "endDate", required = false) Date endDate,
                                    HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");

        String formattedStartDate = startDate != null ? dateFormatter.format(startDate) : "start";
        String formattedEndDate = endDate != null ? dateFormatter.format(endDate) : "end";
        String filename = "Packages_" + formattedStartDate + "_to_" + formattedEndDate + ".xlsx";

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=\"" + filename + "\"";
        response.setHeader(headerKey, headerValue);
        List<Package> packages = packageService.getAllPackageDecs(startDate, endDate).stream().limit(200).collect(Collectors.toList());
        PackageExcelHandler generator = new PackageExcelHandler(packages);
        generator.export(response);
    }
}
