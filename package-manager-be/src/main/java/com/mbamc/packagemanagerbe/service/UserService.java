package com.mbamc.packagemanagerbe.service;

import com.mbamc.packagemanagerbe.converter.UserConverter;
import com.mbamc.packagemanagerbe.dto.tables.UserDto;
import com.mbamc.packagemanagerbe.dto.users.UserUpdateDto;
import com.mbamc.packagemanagerbe.model.User;
import com.mbamc.packagemanagerbe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(Long id) {
        return this.userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public User getUserByUsername(String username) {
        return this.userRepository.getUserByUsername(username);
    }

    public User createUser(UserDto userDto){
        return userRepository.save(UserConverter.toEntity(userDto));
    }

    public User updateUser(UserUpdateDto userUpdateDto){
        User user = this.userRepository.getUserByUsername(userUpdateDto.getUsername());
        user.setDepartment(userUpdateDto.getDepartment());
        this.userRepository.save(user);
        return user;
    }
}
