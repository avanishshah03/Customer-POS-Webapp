package com.project3.backend.repository;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project3.backend.entity.Item;
import com.project3.backend.reports.SalesReport;

@Repository
public interface ItemRepository extends CrudRepository<Item, Integer> {
    @Query(value = "SELECT i.id, i.name AS itemName, COUNT(io.order_id) AS orderCount FROM \"item\" i " +
                   "LEFT JOIN \"item_to_order\" io ON i.id = io.item_id " + 
                   "LEFT JOIN \"order\" o ON io.order_id = o.id " + 
                   "WHERE o.time BETWEEN :startDate AND :endDate " +
                   "GROUP BY i.id, itemName " + 
                   "ORDER BY orderCount DESC", nativeQuery=true)
    List<SalesReport> findItemsWithOrderCount(@Param("startDate") LocalDateTime startDate, 
                                              @Param("endDate") LocalDateTime endDate);
    
}