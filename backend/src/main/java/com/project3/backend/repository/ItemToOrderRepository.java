package com.project3.backend.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project3.backend.entity.ItemToOrder;

@Repository
public interface ItemToOrderRepository extends CrudRepository<ItemToOrder, Integer> {
    List<ItemToOrder> findByOrderId(int orderId);
    ItemToOrder findByItemIdAndOrderId(int itemId, int orderId);
    void deleteByOrderId(int id);
    
}
