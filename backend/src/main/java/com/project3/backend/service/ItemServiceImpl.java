package com.project3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.Ingredient;
import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemToIngredient;
import com.project3.backend.reports.ItemToOrderWithQuantity;
import com.project3.backend.reports.OrderedTogetherReport;
import com.project3.backend.reports.SalesReport;
import com.project3.backend.repository.ItemRepository;
import com.project3.backend.repository.ItemToIngredientRepository;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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

    public Item saveItem(Item item)
    {
        Item savedItem = itemRepository.save(item);
        System.out.println("ingredients: " + item.getIngredients());
        if (item.getIngredients() != null) 
        {
            List<ItemToIngredient> itemsToIngredient = item.getIngredients().entrySet().stream()
                .map(entry -> {
                    ItemToIngredient itemToIngredient = itemToIngredientRepository.findByItemIdAndIngredientId(savedItem.getId(), entry.getKey());
                    if (itemToIngredient == null) {
                        itemToIngredient = new ItemToIngredient();
                    }
                    itemToIngredient.setItemId(savedItem.getId());
                    itemToIngredient.setIngredientId(entry.getKey());
                    itemToIngredient.setQuantity(entry.getValue());
                    return itemToIngredient;
                })
                .collect(Collectors.toList());
            List<ItemToIngredient> existingItemToIngredients = itemToIngredientRepository.findByItemId(savedItem.getId()).stream()
                .filter(itemToIngredient -> !item.getIngredients().containsKey(itemToIngredient.getIngredientId()))
                .collect(Collectors.toList());
            itemToIngredientRepository.deleteAll(existingItemToIngredients);
            itemToIngredientRepository.saveAll(itemsToIngredient);
        }
        return savedItem;
    }

    @Transactional
    public void deleteItem(int id)
    {
        itemToIngredientRepository.deleteByItemId(id);
        itemRepository.deleteById(id);
    }

    public List<ItemToOrderWithQuantity> fetchItemsByOrderId(int orderId)
    {
        return itemRepository.findByItemToOrders_orderId(orderId);
    }

    public List<SalesReport> salesReport(LocalDateTime startDate, LocalDateTime endDate)
    {
        return itemRepository.findItemsWithOrderCount(startDate, endDate);
    }

    public List<Item> excessItems(LocalDateTime startDate, LocalDateTime endDate)
    {
        return itemRepository.findExcessItems(startDate, endDate);
    }

    public List<OrderedTogetherReport> fetchItemsOrderedTogether(LocalDateTime startDate, LocalDateTime endDate)
    {
        return itemRepository.findItemsOrderedTogether(startDate, endDate);
    }
}