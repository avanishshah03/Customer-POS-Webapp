package com.project3.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemCategory;
import com.project3.backend.service.ItemServiceImpl;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
public class DatabaseController {
    @Autowired
    private ItemServiceImpl itemService;
    @Autowired
    private ItemCategoryServiceImpl itemCategoryService;

    @GetMapping("/menuItems")
    public List<Item> getMenuItems() {
        return itemService.fetchMenuItems();
    }

    @GetMapping("/itemCategories")
    public List<ItemCategory> getItemCategories() {
        return itemCategoryService.fetchMenuCategories();
    }
}
