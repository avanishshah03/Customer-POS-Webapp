package com.project3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.User;
import com.project3.backend.repository.UserRepository;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    public String fetchRoleOrCreate(String email)
    {
        List<User> userList = userRepository.findByEmail(email);
        User user = userList.size() > 0 ? userList.get(0) : null;
        if (user == null)
        {
            user = new User();
            user.setEmail(email);
            user.setRole("customer");
            userRepository.save(user);
        }
        return user.getRole();
    }

    public String fetchRole(String email)
    {
        List<User> userList = userRepository.findByEmail(email);
        User user = userList.size() > 0 ? userList.get(0) : null;
        if (user == null)
        {
            return "customer";
        }
        return user.getRole();
    }

    public void saveUser(User user)
    {
        userRepository.save(user);
    }
}
