package com.project3.backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import com.project3.backend.entity.ItemToOrder;

@Repository
public interface ItemToOrderRepository extends CrudRepository<ItemToOrder, Integer> {
    void deleteByOrderId(int id);
    
}
