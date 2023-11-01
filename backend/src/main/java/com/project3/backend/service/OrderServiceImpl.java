package com.project3.backend.service;

import java.util.stream.IntStream;
import java.util.List;
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

    public void saveOrder(Order order)
    {
        Order savedOrder = orderRepository.save(order);
        List<Integer> itemIds = order.getOrderedItemIds();
        List<Integer> quantities = order.getQuantities();
        List<ItemToOrder> itemsToOrder = IntStream.range(0, itemIds.size())
        .mapToObj(i -> {
            ItemToOrder itemToOrder = new ItemToOrder();
            itemToOrder.setOrderId(savedOrder.getId());
            itemToOrder.setItemId(itemIds.get(i));
            itemToOrder.setQuantity(quantities.get(i));
            return itemToOrder;
        })
        .collect(Collectors.toList());
        itemToOrderRepository.saveAll(itemsToOrder);
    }
}
