package com.project3.backend.entity;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class ItemToIngredient {
    @Id
    int id;
    int itemId;
    int ingredientId;
    int quantity;
    
}
