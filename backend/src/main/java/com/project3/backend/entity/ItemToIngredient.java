package com.project3.backend.entity;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

@Entity
@Data
public class ItemToIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "item_to_ingredient_id_seq")
    @SequenceGenerator(name = "item_to_ingredient_id_seq", sequenceName = "item_to_ingredient_id_seq", allocationSize = 1)
    int id;
    int itemId;
    int ingredientId;
    int quantity;
    
}
