package com.project3.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
public class DatabaseController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/menuItems")
    public List<Item> getMenuItems() {
        return jdbcTemplate.query("SELECT * FROM items", new BeanPropertyRowMapper<Item>(Item.class));
    }
}
