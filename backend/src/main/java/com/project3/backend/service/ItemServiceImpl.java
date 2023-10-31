package com.project3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import com.project3.backend.entity.Item;
import com.project3.backend.repository.ItemRepository;

import java.util.List;



public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public List<Item> fetchMenuItems()
    {
        return (List<Item>) itemRepository.findAll();
    }
}
