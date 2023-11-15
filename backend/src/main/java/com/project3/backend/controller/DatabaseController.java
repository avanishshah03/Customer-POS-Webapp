package com.project3.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.authorization.authentication.OAuth2ClientAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.project3.backend.entity.Ingredient;
import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemCategory;
import com.project3.backend.entity.Order;
import com.project3.backend.entity.User;
import com.project3.backend.service.IngredientServiceImpl;
import com.project3.backend.service.ItemCategoryServiceImpl;
import com.project3.backend.service.ItemServiceImpl;
import com.project3.backend.service.ItemToIngredientServiceImpl;
import com.project3.backend.service.OrderServiceImpl;
import com.project3.backend.service.UserServiceImpl;

@RestController
public class DatabaseController {
    @Autowired
    private ItemServiceImpl itemService;
    @Autowired
    private IngredientServiceImpl ingredientService;
    @Autowired
    private ItemToIngredientServiceImpl itemToIngredientService;
    @Autowired
    private ItemCategoryServiceImpl itemCategoryService;
    @Autowired
    private OrderServiceImpl orderService;
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/menuItems")
    public List<Item> getMenuItems() {
        return itemService.fetchMenuItems();
    }

    @GetMapping("/itemCategories")
    public List<ItemCategory> getItemCategories() {
        return itemCategoryService.fetchItemCategories();
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderService.fetchAllOrders();
    }

    @GetMapping("/ingredients")
    public List<Ingredient> getIngredients() {
        return ingredientService.fetchIngredients();
    }

    @PostMapping("/ingredients")
    public void saveIngredient(@RequestBody Ingredient ingredient) {
        System.out.println("Saving ingredient: " + ingredient.toString());
        ingredientService.saveIngredient(ingredient);
    }

    @DeleteMapping("/ingredients")
    public void deleteIngredient(@RequestParam int id) {
        ingredientService.deleteIngredient(id);
    }

    @PostMapping("/orders")
    public void saveOrder(@RequestBody Order order) {
        System.out.println("Saving order: " + order.toString());
        orderService.saveOrder(order);
    }

    @PostMapping("/menuItems")
    public void saveItem(@RequestBody Item item) {
        //TODO: process POST request
        System.out.println("Saving item: " + item.toString());
        itemService.saveItem(item);
    }

    @GetMapping("/itemToIngredient")
    public List<Ingredient> getIngredientsByItemId(@RequestParam int itemId) {
        return itemToIngredientService.fetchIngredientsByItemId(itemId);
    }

    @PostMapping("/auth/register")
    public void registerUser(Authentication authentication) {
        JwtAuthenticationToken clientAuthentication = (JwtAuthenticationToken) authentication;
        
    }
        

    @GetMapping("/auth/login")
    public Map<String, String> getLoginInfo(Authentication authentication) {
        JwtAuthenticationToken clientAuthentication = (JwtAuthenticationToken) authentication;
        System.out.println("Client authentication: " + clientAuthentication.toString());
        String name = authentication.getName();
        Optional<? extends GrantedAuthority> roleOptional = authentication.getAuthorities().stream().findFirst();
        String role = roleOptional.isPresent() ? roleOptional.get().getAuthority() : "";
        return Map.of("user", name, "role", role);
    }
}
