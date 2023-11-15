package com.project3.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project3.backend.entity.User;

import java.util.List;
@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findByEmail(String email);
}
