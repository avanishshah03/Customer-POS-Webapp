package com.project3.backend.service;

import com.project3.backend.entity.Order;
import java.util.List;


public interface OrderService {
    List<Order> fetchAllOrders();
    void saveOrder(Order order);
    void deleteOrder(int id);
}
