package com.mbamc.packagemanagerbe.converter;

import com.mbamc.packagemanagerbe.dto.tables.PackageDto;
import com.mbamc.packagemanagerbe.model.Package;
import org.springframework.stereotype.Component;

@Component
public class PackageConverter {
    public static PackageDto toDto(Package entity) {
        PackageDto dto = new PackageDto();
        dto.setWaybill(entity.getWaybill());
        dto.setUser(entity.getUser().getUsername());
        dto.setRequestedDate(entity.getRequestedDate());
        dto.setDepartment(entity.getUser().getDepartment());
        dto.setCompany(entity.getCompany());
        dto.setCpn(entity.getCpn());
        dto.setConfidentiality(entity.getConfidentiality());
        dto.setPriority(entity.getPriority());
        return dto;
    }

    public Package toEntity(PackageDto dto) {
        Package entity = new Package();
        entity.setWaybill(dto.getWaybill());
//        User user = fetchUserByUsername(dto.getUser());
//        entity.setUser(user);
//        entity.setRequestedDate(dto.getRequestedDate());
//        entity.setDepartment(dto.getDepartment());
//        entity.setCompany(dto.getCompany());
//        entity.setCpn(dto.getCpn());
//        entity.setConfidentiality(dto.getConfidentiality());
//        entity.setPriority(dto.getPriority());
        return entity;
    }
}
