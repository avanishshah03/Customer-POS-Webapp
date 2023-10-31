package com.project3.backend.service;
import com.project3.backend.entity.ItemCategory;
import java.util.List;

public interface ItemCategoryService {

    List<ItemCategory>  fetchItemCategories();
}
