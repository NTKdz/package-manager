package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.dto.tables.UserDto;
import com.mbamc.packagemanagerbe.dto.users.UserUpdateDto;
import com.mbamc.packagemanagerbe.model.User;
import com.mbamc.packagemanagerbe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserUpdateDto userUpdateDto) {
        User user = userService.updateUser(userUpdateDto);
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setName(user.getName());
        userDto.setCompany(user.getCompany());
        userDto.setDepartment(user.getDepartment());
        return ResponseEntity.ok(userDto);
    }
}
