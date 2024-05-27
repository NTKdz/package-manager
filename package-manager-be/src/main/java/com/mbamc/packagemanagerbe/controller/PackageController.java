package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.dto.PackageDto;
import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.service.PackageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController  // Change @Controller to @RestController for REST APIs
@RequestMapping("/packages") // Set a base path for package-related endpoints
public class PackageController {

    private final PackageService packageService;
    private final ModelMapper modelMapper;

    @Autowired
    public PackageController(PackageService packageService, ModelMapper modelMapper) {
        this.packageService = packageService;
        this.modelMapper = modelMapper;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<PackageDto> createPackage(@RequestBody PackageDto packageDto) {
        Package packageRequest = modelMapper.map(packageDto, Package.class);
        Package newPackage =packageService.createPackage(packageRequest);
        PackageDto packageRespond = modelMapper.map(newPackage, PackageDto.class);
        return new ResponseEntity<>(packageRespond, HttpStatus.CREATED);
    }

    // READ
    @GetMapping
    public List<PackageDto> getAllPackages() {
//        List<Package> packages = packageService.getAllPackages();
//        return ResponseEntity.ok(packages);
//
//        return packageService.getAllPackages().stream().map(newPackage -> modelMapper.map(newPackage, PackageDto.class)).
//                collect(Collectors.toList());

        List<Package> mockPackages = Arrays.asList(
                new Package(1L, "Company A", Package.PackageStatus.PENDING, "CPN123", "Department X"),
                new Package(2L, "Company B", Package.PackageStatus.PROCESSING, "CPN456", "Department Y"),
                new Package(3L, "Company C", Package.PackageStatus.SUCCESS, "CPN789", "Department Z")
        );

        // Return mapped DTOs
        return mockPackages.stream()
                .map(packageItem -> modelMapper.map(packageItem, PackageDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PackageDto> getPackageById(@PathVariable Long id) {
        Package packageFound = packageService.getPackageById(id);
        PackageDto packageDto = modelMapper.map(packageFound, PackageDto.class);
        return ResponseEntity.ok().body(packageDto);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<PackageDto> updatePackage(@PathVariable Long id, @RequestBody PackageDto updatedPackageDto) {
        Package packageRequest = modelMapper.map(updatedPackageDto, Package.class);
        Package updatedPost = packageService.updatePackage(id,packageRequest);
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
