package com.project3.backend.entity;

import org.springframework.data.annotation.Id;

import lombok.Data;

/**
 * The `ItemCategory` class represents a category for items in a database.
 * It includes information such as the category's ID and name.
 */
@Data
public class ItemCategory {
    @Id
    private int id;
    private String name;
    
    /**
     * Constructs a new ItemCategory with default values (id=0, name="").
     */
    public ItemCategory()
    {
        this.id = 0;
        this.name = "";
    }

    /**
     * Constructs a new ItemCategory with a given name and default ID (id=0).
     *
     * @param name The name of the category.
     */
    public ItemCategory(String name)
    {
        this.id = 0;
        this.name = name;
    }

    /**
     * Constructs a new ItemCategory with a given ID and name.
     *
     * @param id   The ID of the category.
     * @param name The name of the category.
     */
    public ItemCategory(int id, String name)
    {
        this.id = id;
        this.name = name;
    }

    // /**
    //  * Select and return a list of ItemCategories from the database based on specified conditions.
    //  *
    //  * @param conn       The SQLConnection for database access.
    //  * @param conditions List of conditions to filter the selection.
    //  * @return A list of ItemCategory objects that match the specified conditions.
    //  */
    // public static List<ItemCategory> selectCategories(SQLConnection conn, List<String> conditions)
    // {
    //     List<ItemCategory> categories = new ArrayList<>();
    //     try {
    //         ResultSet rs = conn.select("itemcategory", List.of("*"), conditions);
    //         while (rs.next()) {
    //             categories.add(new ItemCategory(rs.getInt("id"), rs.getString("name")));
    //         }
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     }
    //     return categories;
    // }

    // /**
    //  * Select and return an ItemCategory by its ID from the database.
    //  *
    //  * @param conn The SQLConnection for database access.
    //  * @param id   The ID of the category to select.
    //  * @return An ItemCategory object with the specified ID, or null if not found.
    //  */
    // public static ItemCategory selectCategoryByID(SQLConnection conn, int id)
    // {
    //     List<ItemCategory> categories = selectCategories(conn, List.of("id=" + id));
    //     if (categories.size() == 0) {
    //         return null;
    //     }
    //     return categories.get(0);
    // }

    // /**
    //  * Insert the ItemCategory into the database using the provided SQLConnection.
    //  *
    //  * @param conn The SQLConnection for database access.
    //  */
    // public void insertCategory(SQLConnection conn)
    // {
    //     this.id = conn.selectNextID("itemcategory");
    //     conn.insert("itemcategory", List.of("id", "name"), List.of(String.valueOf(this.id), this.name));
    // }
}
