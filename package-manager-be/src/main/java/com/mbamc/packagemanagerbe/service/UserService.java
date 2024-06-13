package com.mbamc.packagemanagerbe.service;

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
}
