package com.project3.backend.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.Ingredient;
import com.project3.backend.repository.IngredientRepository;

@Service
public class IngredientServiceImpl {
    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Ingredient> fetchIngredients()
    {
        return (List<Ingredient>) ingredientRepository.findAll();
    }

    public void saveIngredient(Ingredient ingredient)
    {
        ingredientRepository.save(ingredient);
    }

    public void deleteIngredient(int id)
    {
        ingredientRepository.deleteById(id);
    }

    
}
