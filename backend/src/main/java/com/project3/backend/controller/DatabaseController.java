package com.project3.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemCategory;
import com.project3.backend.service.ItemCategoryServiceImpl;
import com.project3.backend.service.ItemServiceImpl;
import com.project3.backend.service.OrderServiceImpl;

@RestController
public class DatabaseController {
    @Autowired
    private ItemServiceImpl itemService;
    @Autowired
    private ItemCategoryServiceImpl itemCategoryService;
    @Autowired
    private OrderServiceImpl orderService;

    @GetMapping("/menuItems")
    public List<Item> getMenuItems() {
        return itemService.fetchMenuItems();
    }

    @GetMapping("/itemCategories")
    public List<ItemCategory> getItemCategories() {
        return itemCategoryService.fetchItemCategories();
    }

    @GetMapping("/orders")
    public List<com.project3.backend.entity.Order> getOrders() {
        return orderService.fetchAllOrders();
    }
    
}
