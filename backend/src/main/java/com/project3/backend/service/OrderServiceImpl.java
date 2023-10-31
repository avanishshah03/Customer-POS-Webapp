package com.project3.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.project3.backend.entity.Order;
import com.project3.backend.repository.OrderRepository;

public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> fetchAllOrders()
    {
        return (List<Order>) orderRepository.findAll();
    }
}
