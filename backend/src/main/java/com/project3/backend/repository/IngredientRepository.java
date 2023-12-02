package com.project3.backend.repository;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project3.backend.entity.Ingredient;
import com.project3.backend.reports.IngredientUsageReport;

@Repository
public interface IngredientRepository extends CrudRepository <Ingredient, Integer> {

    List<Ingredient> findByItemToIngredients_itemId(int itemId);
    @Query(value = "SELECT i.name AS ingredientName, SUM(iti.quantity) AS amountUsed " +
                   "FROM \"order\" O " +
                   "JOIN \"item_to_order\" ito ON ito.order_id = O.id " +
                   "JOIN \"item_to_ingredient\" iti ON iti.item_id = ito.item_id " +
                   "JOIN \"ingredient\" i ON i.id = iti.ingredient_id " +
                   "WHERE O.time BETWEEN :startDate AND :endDate " +
                   "GROUP BY i.name " +
                   "ORDER BY i.name", nativeQuery = true)
    List<IngredientUsageReport> findIngredientUsageBetweenDates(@Param("startDate") LocalDateTime startDate, 
                                                                @Param("endDate") LocalDateTime endDate);
}
