package com.project3.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.repository.IngredientRepository;
import com.project3.backend.repository.ItemToIngredientRepository;
import com.project3.backend.entity.Ingredient;
import com.project3.backend.entity.ItemToIngredient;

@Service
public class ItemToIngredientServiceImpl implements ItemToIngredientService {
    @Autowired
    private ItemToIngredientRepository itemToIngredientRepository;
    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Ingredient> fetchIngredientsByItemId(int itemId)
    {
        return (List<Ingredient>) ingredientRepository.findAllById((itemToIngredientRepository.findByItemId(itemId).stream()
            .map(ItemToIngredient::getIngredientId)
            .collect(Collectors.toList())));
    }
}
