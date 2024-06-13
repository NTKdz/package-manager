package com.mbamc.packagemanagerbe.converter;

import com.mbamc.packagemanagerbe.dto.tables.PackageDto;
import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.model.User;
import com.mbamc.packagemanagerbe.repository.UserRepository;
import com.mbamc.packagemanagerbe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PackageConverter {
    public static PackageDto toUserDto(Package entity) {
        PackageDto dto = new PackageDto();
        dto.setUser(null);
        return getPackageDto(entity, dto);
    }

    public static PackageDto toAminDto(Package entity) {
        PackageDto dto = new PackageDto();
        dto.setUser(entity.getUser().getUsername());
        return getPackageDto(entity, dto);
    }

    private static PackageDto getPackageDto(Package entity, PackageDto dto) {
        dto.setWaybill(entity.getWaybill());
        dto.setUserFullName(entity.getUser().getName());
        dto.setRequestedDate(entity.getRequestedDate());
        dto.setDepartment(entity.getUser().getDepartment());
        dto.setCompany(entity.getUser().getCompany());
        dto.setCpn(entity.getCpn());
        dto.setConfidentiality(entity.getConfidentiality());
        dto.setPriority(entity.getPriority());
        return dto;
    }

    public static Package toEntity(PackageDto dto, UserService userService) {
        Package entity = new Package();
        entity.setWaybill(dto.getWaybill());
        User user = userService.getUserByUsername(dto.getUser());
        entity.setUser(user);
        entity.setRequestedDate(dto.getRequestedDate());
        entity.setCpn(dto.getCpn());
        entity.setConfidentiality(dto.getConfidentiality());
        entity.setPriority(dto.getPriority());
        return entity;
    }
}
