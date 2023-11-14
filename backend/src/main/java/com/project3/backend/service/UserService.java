package com.project3.backend.service;

import com.project3.backend.entity.User;

public interface UserService {
    String fetchRole(String email);
    void saveUser(User user);
}
