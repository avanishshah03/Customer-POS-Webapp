package com.project3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemToIngredient;

import com.project3.backend.repository.ItemRepository;
import com.project3.backend.repository.ItemToIngredientRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


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

        List <Integer> ingredientIds = item.getIngredientIds();
        List<Integer> quantities = item.getQuantities();

        List<ItemToIngredient> itemsToIngredient = IntStream.range(0, ingredientIds.size())
        .mapToObj(i -> {
            ItemToIngredient itemToIngredient = new ItemToIngredient();
            itemToIngredient.setItemId(savedItem.getId());
            itemToIngredient.setIngredientId(ingredientIds.get(i));
            itemToIngredient.setQuantity(quantities.get(i));
            return itemToIngredient;
        })
        .collect(Collectors.toList());
        itemToIngredientRepository.saveAll(itemsToIngredient);

    }
}
