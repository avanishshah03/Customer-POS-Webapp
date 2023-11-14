package com.project3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.User;
import com.project3.backend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    public String fetchRole(String email)
    {
        return userRepository.findByEmail(email).getRole();
    }

    public void saveUser(User user)
    {
        userRepository.save(user);
    }
}
