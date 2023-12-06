package com.project3.backend.entity;

import java.util.Map;
import java.util.HashMap;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Transient;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;

/**
 * This class is an identical replication of the items table in the DB.
 * @author David Zhao
 */
@Entity
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "item_id_seq")
    @SequenceGenerator(name = "item_id_seq", sequenceName = "item_id_seq", allocationSize = 1)
    private int id;
    private int categoryId;
    private String name;
    private boolean glutenFree;
    private boolean vegan;
    private double price;
    private String size;
    private boolean extraSauce;
    private String imageUrl;
    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Map<Integer, Integer> ingredients; // ingredient id -> quantity
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredientId")
    @Transient
    @JsonIgnore
    private Set<ItemToIngredient> itemToIngredients;
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderId")
    @Transient
    @JsonIgnore
    private Set<ItemToOrder> itemToOrders;
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