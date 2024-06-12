package com.mbamc.packagemanagerbe.repository;

import com.mbamc.packagemanagerbe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
