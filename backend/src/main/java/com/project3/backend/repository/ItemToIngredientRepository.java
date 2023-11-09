package com.project3.backend.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.project3.backend.entity.ItemToIngredient;

@Repository
public interface ItemToIngredientRepository extends CrudRepository<ItemToIngredient, Integer>{
    List<ItemToIngredient> findByItemId(int itemId);

}
