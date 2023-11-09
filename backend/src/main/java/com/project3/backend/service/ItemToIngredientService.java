package com.project3.backend.service;

import java.util.List;

import com.project3.backend.entity.Ingredient;

public interface ItemToIngredientService {
    List<Ingredient> fetchIngredientsByItemId(int itemId);
}
