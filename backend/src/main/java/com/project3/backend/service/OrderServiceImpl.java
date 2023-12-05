package com.project3.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.ItemToOrder;
import com.project3.backend.entity.Order;
import com.project3.backend.repository.ItemToOrderRepository;
import com.project3.backend.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ItemToOrderRepository itemToOrderRepository;

    public List<Order> fetchAllOrders()
    {
        return (List<Order>) orderRepository.findAll();
    }

    public Order saveOrder(Order order)
    {
        Order savedOrder = orderRepository.save(order);
        List<ItemToOrder> itemsToOrder = savedOrder.getItems().entrySet().stream()
            .map(entry -> {
                ItemToOrder itemToOrder = new ItemToOrder();
                itemToOrder.setOrderId(savedOrder.getId());
                itemToOrder.setItemId(entry.getKey());
                itemToOrder.setQuantity(entry.getValue());
                return itemToOrder;
            })
            .collect(Collectors.toList());
        itemToOrderRepository.saveAll(itemsToOrder);
        return savedOrder;
    }

    public void deleteOrder(int id)
    {
        orderRepository.deleteById(id);
        itemToOrderRepository.deleteByOrderId(id);
    }
}
