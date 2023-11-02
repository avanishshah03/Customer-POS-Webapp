package com.project3.backend.entity;

import java.util.*;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import lombok.Data;

/**
 * This class is an identical replication of the items table in the DB.
 * @author David Zhao
 */
@Data
public class Item {
    @Id
    private int id;
    private int categoryId;
    private String name;
    private boolean glutenFree;
    private boolean vegan;
    private double price;
    private String size;
    private boolean extraSauce;
    @Transient
    private Map<Integer, Integer> ingredients; // ingredient id -> quantity

    @Transient
    private List<Integer> ingredientIds;
    @Transient
    private List<Integer> quantities;
    
    /**
     * Default constructor for the Item class.
     * Initializes all attributes to default values.
     */
    public Item()
    {
        this.id = this.categoryId = 0;
        this.name = this.size = "";
        this.glutenFree = this.vegan = this.extraSauce =false;
        this.price = 0.0;
        ingredients = new HashMap<>();
    }
    
/**
     * Parameterized constructor for the Item class.
     * Initializes the attributes with the provided values.
     *
     * @param id the ID of the item
     * @param categoryid foreign key to the categories table
     * @param name name of the item
     * @param size size of the item
     * @param glutenFree if the item is gluten-free or not
     * @param vegan if the item is vegan or not
     * @param extraSauce if the item comes with extra sauce
     * @param price the price of the item
     */
    public Item(int id, int categoryid, String name, String size, boolean glutenFree, boolean vegan, boolean extraSauce, double price)
    {
        this.id = id;
        this.categoryId = categoryid;
        this.name = name;
        this.size = size;
        this.glutenFree = glutenFree;
        this.vegan = vegan;
        this.extraSauce = extraSauce;
        this.price = price;
        ingredients = new HashMap<>();
    }

    // /**
    //  * Retrieve and add the ingredients associated with this item from a database connection.
    //  *
    //  * @param conn the SQLConnection to the database
    //  */
    // public void addIngredients(SQLConnection conn)
    // {
    //     try {
    //         ResultSet rs = conn.select("item_to_ingredient", List.of("quantity", "ingredient_id"), List.of("item_id=" + this.id));
    //         while (rs.next()) {
    //             this.ingredients.put(rs.getInt("ingredient_id"), rs.getInt("quantity"));
    //         }
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     }
    // }

    // /**
    //  * Order this item and reduce the stock of its ingredients in the database.
    //  *
    //  * @param conn the SQLConnection to the database
    //  */
    // public void orderItem(SQLConnection conn)
    // {
    //     for (Map.Entry<Integer, Integer> ingredientID : this.ingredients.entrySet()) {
    //         conn.decrease("ingredients", "stock", ingredientID.getValue(), "id=" + ingredientID.getKey());
    //     };
    // }

    // /**
    //  * Retrieve and return a list of all items from the database.
    //  *
    //  * @param conn the SQLConnection to the database
    //  * @return a list of all items
    //  */
    // public static List<Item> selectAllItems(SQLConnection conn)
    // {
    //     return selectItems(conn, List.of("TRUE"));
    // }
}