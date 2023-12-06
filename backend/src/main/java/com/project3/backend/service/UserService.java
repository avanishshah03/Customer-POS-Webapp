package com.project3.backend.service;

import java.util.List;

import com.project3.backend.entity.User;

public interface UserService {
    List<User> fetchUsers();
    String fetchRoleOrCreate(String email);
    String fetchRole(String email);
    User saveUser(User user);
    void deleteUser(int id);
}
