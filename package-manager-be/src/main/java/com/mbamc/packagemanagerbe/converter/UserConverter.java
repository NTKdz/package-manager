package com.mbamc.packagemanagerbe.converter;

import com.mbamc.packagemanagerbe.dto.tables.UserDto;
import com.mbamc.packagemanagerbe.model.User;

public class UserConverter {
    public static User toEntity(UserDto userDto){
        User newUser= new User();
        newUser.setUsername(userDto.getUsername());
        newUser.setName(userDto.getName());
        newUser.setDepartment(userDto.getDepartment());
        newUser.setCompany(userDto.getCompany());
        return newUser;
    }
}
