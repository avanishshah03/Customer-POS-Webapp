package com.project3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.User;
import com.project3.backend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    public String fetchRoleOrCreate(String email)
    {
        User user = userRepository.findByEmail(email);
        if (user == null)
        {
            user = new User();
            user.setEmail(email);
            user.setRole("USER");
            userRepository.save(user);
        }
        return user.getRole();
    }

    public String fetchRole(String email)
    {
        User user = userRepository.findByEmail(email);
        return user.getRole();
    }

    public void saveUser(User user)
    {
        userRepository.save(user);
    }
}
