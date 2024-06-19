package com.mbamc.packagemanagerbe.dto.tables;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PackageDtoTable {
    Long total;
    List<PackageDto> data;
}
