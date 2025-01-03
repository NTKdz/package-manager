package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.converter.PackageConverter;
import com.mbamc.packagemanagerbe.dto.tables.PackageDto;
import com.mbamc.packagemanagerbe.dto.tables.PackageDtoTable;
import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.service.PackageService;
import com.mbamc.packagemanagerbe.service.UserService;
import com.mbamc.packagemanagerbe.util.PackageExcelHandler;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/packages")
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

    @GetMapping("/query")
    public ResponseEntity<PackageDtoTable> getAllPackagesByCriteria(
            @RequestParam(value = "waybill", required = false) Long waybill,
            @RequestParam(value = "requestedDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "priority", required = false) Package.Priority priority,
            @RequestParam(value = "confidentiality", required = false) Package.Confidentiality confidentiality,
            @AuthenticationPrincipal Jwt jwt,
            Pageable pageable) {
        Collection<String> roles = new HashSet<>();
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        if (resourceAccess != null) {
            Map<String, Object> packageManagerResource = (Map<String, Object>) resourceAccess.get("package-manager");
            if (packageManagerResource != null && packageManagerResource.get("roles") != null) {
                    roles.addAll((Collection<String>) packageManagerResource.get("roles"));
            }
        }
        boolean isAdmin = roles.contains("admin");
        if (!isAdmin) {
            username = jwt.getClaim("preferred_username");
        }

        PackageDtoTable packageDtoTable = new PackageDtoTable();
        Page<Package> packages = packageService.getAllPackageByCriteria(waybill, date, name, username, department, priority, confidentiality, pageable);
        List<PackageDto> packagesD = packages.getContent()
                .stream().map(PackageConverter::toAminDto).
                collect(Collectors.toList());
        packageDtoTable.setData(packagesD);
        packageDtoTable.setTotal(packages.getTotalElements());
        return ResponseEntity.ok(packageDtoTable);
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
