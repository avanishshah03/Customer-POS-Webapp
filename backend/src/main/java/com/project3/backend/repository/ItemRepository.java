package com.project3.backend.repository;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project3.backend.entity.Item;
import com.project3.backend.reports.ItemToOrderwithQuantity;
import com.project3.backend.reports.OrderedTogetherReport;
import com.project3.backend.reports.SalesReport;

@Repository
public interface ItemRepository extends CrudRepository<Item, Integer> {
    @Query(value = "SELECT i.id, i.name, i.price, i.vegan, i.gluten_free AS glutenFree, i.category_id AS categoryId, i.size, i.extra_sauce AS extraSauce, i.image_url as imageUrl, io.quantity " +
                   "FROM item i " +
                   "JOIN item_to_order io ON i.id = io.item_id " +
                   "JOIN \"order\" o ON io.order_id = o.id " +
                   "WHERE o.id = :orderId", nativeQuery = true)
    List<ItemToOrderwithQuantity> findByItemToOrders_orderId(int orderId);
    
    @Query(value = "SELECT i.id, i.name AS itemName, COUNT(io.order_id) AS orderCount FROM item i " +
                   "LEFT JOIN item_to_order io ON i.id = io.item_id " + 
                   "LEFT JOIN \"order\" o ON io.order_id = o.id " + 
                   "WHERE o.time BETWEEN :startDate AND :endDate " +
                   "GROUP BY i.id, itemName " + 
                   "ORDER BY orderCount DESC", nativeQuery=true)
    List<SalesReport> findItemsWithOrderCount(@Param("startDate") LocalDateTime startDate, 
                                              @Param("endDate") LocalDateTime endDate);

    @Query(value = "WITH ItemSales AS (" +
                        "SELECT io.item_id, SUM(ii.Quantity) AS total_sold " +
                        "FROM item_to_order AS io " +
                        "INNER JOIN \"order\" AS o ON io.order_id = o.id " +
                        "LEFT JOIN item_TO_ingredient AS ii ON io.item_id = ii.item_ID " +
                        "LEFT JOIN ingredient AS ing ON ii.ingredient_ID = ing.ID " +
                        "WHERE o.time >= :chosen_timestamp AND o.time <= :current_timestamp " +
                    "GROUP BY io.item_id), " +
                    "ItemInventory AS (" +
                        "SELECT i.id, i.name, i.price, " +
                        "i.vegan, i.gluten_free, " +
                        "i.category_id, i.size, i.extra_sauce, i.image_url, ing.restock, " +
                        "SUM(ii.Quantity) AS total_ingredient " +
                        "FROM item AS i " +
                        "LEFT JOIN item_TO_ingredient AS ii ON i.ID = ii.id " +
                        "LEFT JOIN ingredient AS ing ON ii.ingredient_ID = ing.id " +
                    "GROUP BY i.id, i.name, i.price, i.vegan, i.gluten_free, i.category_id, i.size, i.extra_sauce, i.image_url, ing.restock), " +
                    "DistinctItems AS (" +
                        "SELECT ii.id, ii.name, ii.price, ii.vegan, " +
                        "ii.gluten_free, ii.category_id, ii.size, ii.extra_sauce, ii.image_url, " +
                        "CASE WHEN (total_sold IS NULL) THEN 0 ELSE total_sold END AS total_sold " +
                        "FROM ItemInventory AS ii " +
                        "LEFT JOIN ItemSales AS isales ON ii.id = isales.item_id " +
                    "WHERE (COALESCE(isales.total_sold, 0) / ii.restock) < 0.10 OR isales.total_sold IS NULL) " +
                    "SELECT * " +
                    "FROM (" +
                        "SELECT *, ROW_NUMBER() OVER(PARTITION BY id ORDER BY total_sold DESC) AS rn " +
                    "FROM DistinctItems) AS ranked " +
                    "WHERE rn = 1 AND total_sold = 0", nativeQuery = true)
    List<Item> findExcessItems(@Param("chosen_timestamp") LocalDateTime chosenTimestamp, 
                               @Param("current_timestamp") LocalDateTime currentTimestamp);

    @Query(value = "WITH FilteredOrders AS (" +
					"SELECT o.id AS order_id, io1.item_id AS item1_id, io2.item_id AS item2_id " +
					"FROM \"order\" o " +
					"JOIN item_to_order io1 ON o.id = io1.order_id " +
					"JOIN item_to_order io2 ON o.id = io2.order_id " +
					"JOIN item i1 ON io1.item_id = i1.id " +
					"JOIN item i2 ON io2.item_id = i2.id " +
					"WHERE o.time BETWEEN :startDate AND :endDate " +
					"AND io1.item_id < io2.item_id " +
					"AND i1.name < i2.name " +
				") " +
				
				"SELECT i1.name AS item1Name, i2.name AS item2Name, COALESCE(COUNT(*), 0) AS pairCount " +
				"FROM FilteredOrders " +
				"JOIN item i1 ON FilteredOrders.item1_id = i1.id " +
				"JOIN item i2 ON FilteredOrders.item2_id = i2.id " +
				"GROUP BY i1.name, i2.name " +
				"ORDER BY pairCount DESC", nativeQuery = true)
                        
    List<OrderedTogetherReport> findItemsOrderedTogether(@Param("startDate") LocalDateTime startDate, 
                                                         @Param("endDate") LocalDateTime endDate);
}