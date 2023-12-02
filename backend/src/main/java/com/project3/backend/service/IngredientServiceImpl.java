package com.project3.backend.service;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.Ingredient;
import com.project3.backend.reports.IngredientUsageReport;
import com.project3.backend.repository.IngredientRepository;
import com.project3.backend.repository.ItemToIngredientRepository;

@Service
public class IngredientServiceImpl {
    @Autowired
    private IngredientRepository ingredientRepository;
    @Autowired
    private ItemToIngredientRepository itemToIngredientRepository;

    public List<Ingredient> fetchIngredients()
    {
        return (List<Ingredient>) ingredientRepository.findAll();
    }

    public List<Ingredient> fetchIngredientsById(List<Integer> ids)
    {
        return (List<Ingredient>) ingredientRepository.findAllById(ids);
    }

    public void saveIngredient(Ingredient ingredient)
    {
        ingredientRepository.save(ingredient);
    }

    public void deleteIngredient(int id)
    {
        ingredientRepository.deleteById(id);
    }

    public List<Ingredient> fetchIngredientsByItemId(int itemId)
    {
        return ingredientRepository.findByItemToIngredients_itemId(itemId);
    }
    
    public List<IngredientUsageReport> fetchIngredientUsageBetweenDates(LocalDateTime startDate, LocalDateTime endDate)
    {
        return ingredientRepository.findIngredientUsageBetweenDates(startDate, endDate);
    }
}
