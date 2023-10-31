package com.project3.backend;

import java.util.*;
import java.util.stream.Collectors;
import java.sql.*;
import java.time.*;

/**
 * The `Order` class represents a customer order in an e-commerce system.
 * It includes information about the order's ID, total price, timestamp, and
 * user ID,
 * as well as a list of ordered item IDs.
 */
public class Order {
    private int id;
    private double price;
    private LocalDateTime time;
    private int userId;
    private List<Integer> orderedItemIDs;

    /**
     * Default constructor for creating an empty order.
     */
    public Order() {
        this.id = 0;
        this.price = 0.0;
        this.time = LocalDateTime.now();
        this.userId = 0;
        orderedItemIDs = new ArrayList<>();
    }

    /**
     * Constructor for creating an order with specified details.
     *
     * @param id     The unique identifier for the order.
     * @param price  The total price of the order.
     * @param time   The timestamp when the order was placed.
     * @param userId The user ID associated with the order.
     */
    public Order(int id, float price, LocalDateTime time, int userId) {
        this.id = id;
        this.price = price;
        this.time = time;
        this.userId = userId;
        orderedItemIDs = new ArrayList<>();
    }

    /**
     * Constructor for creating an order with a timestamp and a list of ordered
     * items.
     *
     * @param time         The timestamp when the order was placed.
     * @param orderedItems A list of items included in the order.
     */
    public Order(LocalDateTime time, List<Item> orderedItems) {
        this.id = 0;
        this.price = orderedItems.stream().mapToDouble(Item::getPrice).sum();
        this.time = time;
        this.userId = 1;
        this.orderedItemIDs = orderedItems.stream().map(Item::getID).collect(Collectors.toList());
    }

    /**
     * Get the ID of the order.
     *
     * @return The unique identifier of the order.
     */
    public int getID() {
        return this.id;
    }

    /**
     * Get the total price of the order.
     *
     * @return The total price of the order.
     */
    public double getPrice() {
        return this.price;
    }

    /**
     * Get the timestamp when the order was placed.
     *
     * @return The timestamp of the order.
     */
    public LocalDateTime getTime() {
        return this.time;
    }

    /**
     * Get the user ID associated with the order.
     *
     * @return The user ID of the order owner.
     */
    public int getUserId() {
        return this.userId;
    }

    /**
     * Returns a string representation of the order.
     *
     * @return A formatted string describing the order.
     */
    public String toString() {
        return String.format("Order %d with price $%.2f at time %s by user %d", id, price, time.toString(), userId);
    }

    /**
     * Inserts the order and associated items into the database.
     *
     * @param conn The SQLConnection object for database interaction.
     */
    public void insertOrder(SQLConnection conn) {
        int nextID = conn.selectNextID("orders");
        List<String> columns = List.of("id", "price", "time", "user_id");
        List<String> values = List.of(String.valueOf(nextID), String.valueOf(getPrice()), getTime().toString(),
                String.valueOf(getUserId()));
        conn.insert("orders", columns, values);
        for (int itemID : orderedItemIDs) {
            List<String> itemColumns = List.of("order_id", "item_id");
            List<String> itemValues = List.of(String.valueOf(nextID), String.valueOf(itemID));
            conn.insert("item_to_order", itemColumns, itemValues);
        }
    }

    /**
     * Retrieves and adds items to the order from the database.
     *
     * @param conn The SQLConnection object for database interaction.
     */
    public void addItems(SQLConnection conn) {
        try {
            ResultSet rs = conn.select("item_to_order", List.of("item_id"), List.of("order_id=" + this.id));
            while (rs.next()) {
                orderedItemIDs.add(rs.getInt("item_id"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Retrieves a list of orders from the database based on specified conditions.
     *
     * @param conn       The SQLConnection object for database interaction.
     * @param conditions A list of conditions to filter the orders.
     * @return A list of orders matching the conditions.
     */
    public static List<Order> selectOrders(SQLConnection conn, List<String> conditions) {
        List<Order> orders = new ArrayList<Order>();
        try {
            ResultSet rs = conn.select("orders", List.of("*"), conditions);
            while (rs.next()) {
                Order nextOrder = new Order(rs.getInt("id"), rs.getFloat("price"),
                        rs.getTimestamp("time").toLocalDateTime(), rs.getInt("user_id"));
                nextOrder.addItems(conn);
                orders.add(nextOrder);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return orders;
    }

    /**
     * Retrieves an order by its unique ID from the database.
     *
     * @param conn The SQLConnection object for database interaction.
     * @param id   The unique identifier of the order.
     * @return The order with the specified ID, or null if not found.
     */
    public static Order selectOrderById(SQLConnection conn, int id) {
        List<String> conditions = new ArrayList<>();
        conditions.add("id=" + id);
        List<Order> orders = selectOrders(conn, conditions);
        if (orders.size() == 0) {
            return null;
        }
        return orders.get(0);
    }

}
