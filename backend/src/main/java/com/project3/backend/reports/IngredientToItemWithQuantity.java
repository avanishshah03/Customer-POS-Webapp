package com.project3.backend.reports;

public interface IngredientToItemWithQuantity {
    int getId();
    String getName();
    int getStock();
    int getRestock();
    int getAmountOrdered();
    double getPrice();
    boolean getGlutenFree();
    boolean getVegan();
    int getQuantity();
}
