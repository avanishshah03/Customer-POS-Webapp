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
        System.out.println("items: " + order.getItems());
        if (order.getItems() != null)
        {
            System.out.println("modifying itemsToOrder");
            List<ItemToOrder> itemsToOrder = order.getItems().entrySet().stream()
                .map(entry -> {
                    ItemToOrder itemToOrder = itemToOrderRepository.findByItemIdAndOrderId(entry.getKey(), savedOrder.getId());
                    if (itemToOrder == null) {
                        itemToOrder = new ItemToOrder();
                    }
                    itemToOrder.setOrderId(savedOrder.getId());
                    itemToOrder.setItemId(entry.getKey());
                    itemToOrder.setQuantity(entry.getValue());
                    return itemToOrder;
                })
                .collect(Collectors.toList());
            
            List<ItemToOrder> existingItemToOrders = itemToOrderRepository.findByOrderId(savedOrder.getId()).stream()
                .filter(itemToOrder -> !order.getItems().containsKey(itemToOrder.getItemId()))
                .collect(Collectors.toList());
            itemToOrderRepository.deleteAll(existingItemToOrders);
            itemToOrderRepository.saveAll(itemsToOrder);
        }
        return savedOrder;
    }

    public void deleteOrder(int id)
    {
        orderRepository.deleteById(id);
        itemToOrderRepository.deleteByOrderId(id);
    }
}