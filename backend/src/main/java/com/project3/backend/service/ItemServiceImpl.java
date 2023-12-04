package com.project3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.Ingredient;
import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemToIngredient;
import com.project3.backend.reports.SalesReport;
import com.project3.backend.repository.ItemRepository;
import com.project3.backend.repository.ItemToIngredientRepository;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.time.LocalDateTime;


@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private ItemToIngredientRepository itemToIngredientRepository;

    public List<Item> fetchMenuItems()
    {
        return (List<Item>) itemRepository.findAll();
    }

    public void saveItem(Item item)
    {
        Item savedItem = itemRepository.save(item);

        List<ItemToIngredient> itemsToIngredient = savedItem.getIngredients().entrySet().stream()
            .map(entry -> {
                ItemToIngredient itemToIngredient = new ItemToIngredient();
                itemToIngredient.setItemId(savedItem.getId());
                itemToIngredient.setIngredientId(entry.getKey());
                itemToIngredient.setQuantity(entry.getValue());
                return itemToIngredient;
            })
            .collect(Collectors.toList());
        itemToIngredientRepository.saveAll(itemsToIngredient);
    }

    @Transactional
    public void deleteItem(int id)
    {
        itemToIngredientRepository.deleteByItemId(id);
        itemRepository.deleteById(id);
    }

    public List<SalesReport> salesReport(LocalDateTime startDate, LocalDateTime endDate)
    {
        return itemRepository.findItemsWithOrderCount(startDate, endDate);
    }

    public List<Item> excessItems(LocalDateTime startDate, LocalDateTime endDate)
    {
        return itemRepository.findExcessItems(startDate, endDate);
    }
}
