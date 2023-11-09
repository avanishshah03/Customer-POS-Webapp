package com.project3.backend.service;
import com.project3.backend.entity.Ingredient;
import java.util.*;

public interface IngredientService {
    List<Ingredient> fetchIngredients();
    List<Ingredient> fetchIngredientsById(List<Integer> ids);
    void saveIngredient(Ingredient ingredient);
    void deleteIngredient(int id);
}
