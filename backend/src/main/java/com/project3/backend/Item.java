package com.project3.backend;

import java.util.*;

import org.springframework.data.annotation.Id;

/**
 * This class is an identical replication of the items table in the DB.
 * @author David Zhao
 */
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
    private Map<Integer, Integer> ingredients; // ingredient id -> quantity
    
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

    /**
     * Get the ID of the item.
     *
     * @return the ID of the item
     */
    public int getID()
    {
    	return this.id;
    }

    /**
     * Get the category ID of the item.
     *
     * @return the category ID of the item
     */
    public int getCategoryId()
    {
        return this.categoryId;
    }

    /**
     * Get the name of the item.
     *
     * @return the name of the item
     */
    public String getName()
    {
        return this.name;
    }

    /**
     * Get the size of the item.
     *
     * @return the size of the item
     */
    public String getSize()
    {
        return this.size;
    }

    /**
     * Check if the item is gluten-free.
     *
     * @return true if the item is gluten-free, false otherwise
     */
    public boolean isGlutenFree()
    {
        return this.glutenFree;
    }

    /**
     * Check if the item is vegan.
     *
     * @return true if the item is vegan, false otherwise
     */
    public boolean isVegan()
    {
        return this.vegan;
    }

    /**
     * Check if the item comes with extra sauce.
     *
     * @return true if the item comes with extra sauce, false otherwise
     */
    public boolean isExtraSauce()
    {
        return this.extraSauce;
    }

    /**
     * Get the price of the item.
     *
     * @return the price of the item
     */
    public double getPrice()
    {
        return this.price;
    }

    /**
     * Get the ingredients associated with the item.
     *
     * @return a map of ingredient IDs to their quantities
     */
    public Map<Integer, Integer> getIngredients()
    {
        return this.ingredients;
    }

    /**
     * Set the category ID of the item.
     *
     * @param categoryId the new category ID
     */
    public void setCategoryId(int categoryId)
    {
        this.categoryId = categoryId;
    }

    /**
     * Set the name of the item.
     *
     * @param name the new name of the item
     */
    public void setName(String name)
    {
        this.name = name;
    }

    /**
     * Set the size of the item.
     *
     * @param size the new size of the item
     */
    public void setSize(String size)
    {
        this.size = size;
    }

    /**
     * Set the gluten-free status of the item.
     *
     * @param glutenFree true if the item is gluten-free, false otherwise
     */
    public void setGlutenFree(boolean glutenFree)
    {
        this.glutenFree = glutenFree;
    }

    /**
     * Set the vegan status of the item.
     *
     * @param vegan true if the item is vegan, false otherwise
     */
    public void setVegan(boolean vegan)
    {
        this.vegan = vegan;
    }

    /**
     * Set the extra sauce availability status of the item.
     *
     * @param extraSauce true if the item comes with extra sauce, false otherwise
     */
    public void setExtraSauce(boolean extraSauce)
    {
        this.extraSauce = extraSauce;
    }

    /**
     * Set the price of the item.
     *
     * @param price the new price of the item
     */
    public void setPrice(double price)
    {
        this.price = price;
    }


    /**
     * Generate a formatted string representation of the item.
     *
     * @return a formatted string containing the name, size, and special dietary labels (if applicable)
     */
    public String toString()
    {
        return String.format("%s %s %s %s", this.name, this.size, this.glutenFree ? "GF" : "", this.vegan ? "V" : "");
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