package com.project3.backend.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.ItemCategory;
import com.project3.backend.repository.ItemCategoryRepository;

@Service
public class ItemCategoryServiceImpl implements ItemCategoryService{
    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    public List<ItemCategory> fetchItemCategories()
    {
        return (List<ItemCategory>) itemCategoryRepository.findAll();

    }
}
