package com.project3.backend;
import java.util.*;


import java.sql.*;

/**
 * Represents an Ingredient used in the restaurant.
 */
public class Ingredient {
    private int id;
    private String name;
    private int stock, restock, amountordered;
    private double price;
    private boolean glutenfree, vegan;

    /**
     * Default constructor for creating an Ingredient.
     */
    public Ingredient()
    {
        this.id = 0;
        this.name = "";
        this.stock = 0;
        this.restock = 0;
        this.amountordered = 0;
        this.price = 0.0;
        this.glutenfree = false;
        this.vegan = false;
    }

     /**
     * Parameterized constructor for creating an Ingredient with specified attributes.
     *
     * @param name       The name of the ingredient.
     * @param stock      The current stock of the ingredient.
     * @param restock    The restock quantity of the ingredient.
     * @param price      The price of the ingredient.
     * @param glutenfree Indicates if the ingredient is gluten-free.
     * @param vegan      Indicates if the ingredient is vegan.
     */
    public Ingredient(String name, int stock, int restock, double price, boolean glutenfree, boolean vegan)
    {
        this.id = 0;
        this.name = name;
        this.stock = stock;
        this.restock = restock;
        this.amountordered = 0;
        this.price = price;
        this.glutenfree = glutenfree;
        this.vegan = vegan;
    }

    /**
     * Parameterized constructor for creating an Ingredient with all attributes.
     *
     * @param id          The unique identifier of the ingredient.
     * @param name        The name of the ingredient.
     * @param stock       The current stock of the ingredient.
     * @param restock     The restock quantity of the ingredient.
     * @param amountordered The amount of this ingredient ordered.
     * @param price       The price of the ingredient.
     * @param glutenfree  Indicates if the ingredient is gluten-free.
     * @param vegan       Indicates if the ingredient is vegan.
     */
    public Ingredient(int id, String name, int stock, int restock, int amountordered, double price, boolean glutenfree, boolean vegan)
    {
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.restock = restock;
        this.amountordered = amountordered;
        this.price = price;
        this.glutenfree = glutenfree;
        this.vegan = vegan;
    }

    public int getID()
    {
        return this.id;
    }

    public String getName()
    {
        return this.name;
    }

    public int getStock()
    {
        return this.stock;
    }

    public int getRestock()
    {
        return this.restock;
    }

    public int getAmountOrdered()
    {
        return this.amountordered;
    }

    public double getPrice()
    {
        return this.price;
    }

    public boolean isGlutenFree()
    {
        return this.glutenfree;
    }

    public boolean isVegan()
    {
        return this.vegan;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public void setStock(int stock)
    {
        this.stock = stock;
    }

    public void setRestock(int restock)
    {
        this.restock = restock;
    }

    public void setAmountOrdered(int amountordered)
    {
        this.amountordered = amountordered;
    }

    public void setPrice(double price)
    {
        this.price = price;
    }

    public void setGlutenFree(boolean glutenfree)
    {
        this.glutenfree = glutenfree;
    }

    public void setVegan(boolean vegan)
    {
        this.vegan = vegan;
    }

   

    /**
     * Selects a list of ingredients based on specified conditions.
     *
     * @param conn       The SQLConnection object for database operations.
     * @param conditions The conditions to filter ingredients (e.g., "gluten_free=true").
     * @return A list of ingredients that meet the specified conditions.
     */
    public static List<Ingredient> selectIngredients(SQLConnection conn, List<String> conditions)
    {
        List<Ingredient> ingredients = new ArrayList<Ingredient>();
        try {
            ResultSet rs = conn.select("ingredients", List.of("*"), conditions);
            while (rs.next()) {
                ingredients.add(new Ingredient(rs.getInt("id"), rs.getString("name"), rs.getInt("stock"), rs.getInt("restock"), rs.getInt("amount_ordered"), rs.getFloat("price"), rs.getBoolean("gluten_free"), rs.getBoolean("vegan")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ingredients;
    }

    /**
     * Selects all ingredients from the database.
     *
     * @param conn The SQLConnection object for database operations.
     * @return A list of all ingredients in the database.
     */
    public static List<Ingredient> selectAllIngredients(SQLConnection conn)
    {
        return selectIngredients(conn, List.of("TRUE"));
    }

    /**
     * Selects an ingredient by its unique identifier.
     *
     * @param conn The SQLConnection object for database operations.
     * @param id   The unique identifier of the ingredient.
     * @return The Ingredient object with the specified identifier, or null if not found.
     */
    public static Ingredient selectIngredientByID(SQLConnection conn, int id)
    {
        List<String> conditions = new ArrayList<String>();
        conditions.add("id=" + id);
        List<Ingredient> ingredients = selectIngredients(conn, conditions);
        if (ingredients.isEmpty()) {
            return null;
        }
        return ingredients.get(0);
    }

    /**
     * Inserts the current ingredient into the database.
     *
     * @param conn The SQLConnection object for database operations.
     */
    public void insertIngredient(SQLConnection conn) {
        List<String> columns = List.of("name", "stock", "restock", "price", "gluten_free", "vegan");
        List<String> values = List.of(this.getName(), String.valueOf(stock), String.valueOf(restock), String.valueOf(this.getPrice()), String.valueOf(this.isGlutenFree()), String.valueOf(this.isVegan()));
        conn.insert("ingredients", columns, values);
    }

    /**
     * Updates the current ingredient's information in the database.
     *
     * @param conn The SQLConnection object for database operations.
     */
    public void updateIngredient(SQLConnection conn)
    {
        List<String> columns = List.of("name", "stock", "restock", "price", "gluten_free", "vegan");
        List<String> values = List.of(this.getName(), String.valueOf(stock), String.valueOf(restock), String.valueOf(this.getPrice()), String.valueOf(this.isGlutenFree()), String.valueOf(this.isVegan()));
        conn.update("ingredients", columns, values, List.of("id=" + this.getID()));
    }

    /**
     * Deletes the current ingredient from the database.
     *
     * @param conn The SQLConnection object for database operations.
     */
    public void deleteIngredient(SQLConnection conn) {
        conn.delete("ingredients", List.of("id=" + this.getID()));
    }
}
