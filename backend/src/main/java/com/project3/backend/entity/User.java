package com.project3.backend.entity;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class User {
    @Id
    private int id;
    private String username;
    private String password;
    private String email;
    private String role;

    public User() {
        this.id = 0;
        this.username = "";
        this.password = "";
        this.email = "";
        this.role = "";
    }
}
