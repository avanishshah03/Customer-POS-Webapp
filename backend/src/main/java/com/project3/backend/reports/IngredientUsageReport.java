package com.project3.backend.reports;

import com.project3.backend.entity.Ingredient;

public interface IngredientUsageReport {
    String getIngredientName();
    int getAmountUsed();
}
