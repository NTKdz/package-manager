package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.converter.PackageConverter;
import com.mbamc.packagemanagerbe.dto.tables.PackageDto;
import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.service.PackageService;
import com.mbamc.packagemanagerbe.service.UserService;
import com.mbamc.packagemanagerbe.util.PackageExcelHandler;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

@RestController  // Change @Controller to @RestController for REST APIs
@RequestMapping("/packages") // Set a base path for package-related endpoints
public class PackageController {
    private final PackageService packageService;
    private final ModelMapper modelMapper;
    private final UserService userService;

    @Autowired
    public PackageController(PackageService packageService, ModelMapper modelMapper, UserService userService) {
        this.packageService = packageService;
        this.modelMapper = modelMapper;
        this.userService = userService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<PackageDto> createPackage(@RequestBody PackageDto packageDto) {
        Package packageRequest = PackageConverter.toEntity(packageDto, userService);
        Package newPackage = packageService.createPackage(packageRequest);
        PackageDto packageRespond = modelMapper.map(newPackage, PackageDto.class);
        return new ResponseEntity<>(packageRespond, HttpStatus.CREATED);
    }

    @GetMapping("/import")
    public void mapReapExcelDatatoDB(@RequestParam("file") MultipartFile reapExcelDataFile) throws IOException {
    }

    // READ
    @GetMapping
    public ResponseEntity<List<PackageDto>> getAllPackages() {
        List<Package> packages = packageService.getAllPackages();

        return ResponseEntity.ok(packages.stream().map(PackageConverter::toAminDto).
                collect(Collectors.toList()));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<PackageDto>> getAllPackageByUserName(@PathVariable String username) {
        List<Package> packages = packageService.getAllPackageByUserName(username);

        return ResponseEntity.ok(packages.stream().map(PackageConverter::toAminDto).
                collect(Collectors.toList()));
    }

    @GetMapping("/packages")
    public ResponseEntity<List<PackageDto>> getAllPackagesByCriteria(
            @RequestParam(value = "requestedDate", required = false) Date date,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "cpn", required = false) String cpn,
            @RequestParam(value = "priority", required = false) Package.Priority priority,
            @RequestParam(value = "confidentiality", required = false) Package.Confidentiality confidentiality) {

        List<Package> packages = packageService.getAllPackageByCriteria(date, name, department, cpn, priority, confidentiality);
        return ResponseEntity.ok(packages.stream().map(PackageConverter::toAminDto).
                collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PackageDto> getPackageById(@PathVariable Long id) {
        Package packageFound = packageService.getPackageById(id);
        PackageDto packageDto = modelMapper.map(packageFound, PackageDto.class);
        return ResponseEntity.ok().body(packageDto);
    }


    @GetMapping("/export-to-excel")
    public void exportIntoExcelFile(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=Packages" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<Package> packages = packageService.getAllPackages();
        PackageExcelHandler generator = new PackageExcelHandler(packages);
        generator.export(response);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<PackageDto> updatePackage(@PathVariable Long id, @RequestBody PackageDto updatedPackageDto) {
        Package packageRequest = modelMapper.map(updatedPackageDto, Package.class);
        Package updatedPost = packageService.updatePackage(id, packageRequest);
        PackageDto packageRespond = modelMapper.map(updatedPost, PackageDto.class);
        return new ResponseEntity<>(packageRespond, HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
}
