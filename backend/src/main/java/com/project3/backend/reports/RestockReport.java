package com.project3.backend.reports;

import com.project3.backend.entity.Ingredient;

public interface RestockReport {
    Ingredient getIngredient();
    int getRestockAmount();
}
