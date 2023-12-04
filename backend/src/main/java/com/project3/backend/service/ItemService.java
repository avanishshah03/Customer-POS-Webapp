package com.project3.backend.service;
import com.project3.backend.entity.Item;
import com.project3.backend.reports.OrderedTogetherReport;
import com.project3.backend.reports.SalesReport;

import java.util.List;

import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

public interface ItemService {
    List<Item> fetchMenuItems();
    void saveItem(Item item);
    void deleteItem(int id);
    public List<SalesReport> salesReport(LocalDateTime startDate, LocalDateTime endDate);
    public List<Item> excessItems(LocalDateTime startDate, LocalDateTime endDate);
    public List<OrderedTogetherReport> fetchItemsOrderedTogether(LocalDateTime startDate, LocalDateTime endDate);
}