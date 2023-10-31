package com.project3.backend.service;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.project3.backend.entity.ItemCategory;
import com.project3.backend.repository.ItemCategoryRepository;

public class ItemCategoryServiceImpl implements ItemCategoryService{
    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    public  List<ItemCategory> fetchItemCategories()
    {
        return (List<ItemCategory>) itemCategoryRepository.findAll();

    }
}
