package com.project3.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemCategory;

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

    @GetMapping("/categories")
    public List<ItemCategory> getCategories() {
        return jdbcTemplate.query("SELECT * FROM categories", new BeanPropertyRowMapper<ItemCategory>(ItemCategory.class));
    }
}
