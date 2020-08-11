package com.eventheart.dao;

import com.eventheart.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>{
    List<User> findByName(String name);
    boolean existsByName(String name);
}
