package com.project3.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.project3.backend.entity.Ingredient;
import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemCategory;
import com.project3.backend.entity.Order;
import com.project3.backend.entity.User;
import com.project3.backend.reports.IngredientUsageReport;
import com.project3.backend.reports.OrderedTogetherReport;
import com.project3.backend.reports.RestockReport;
import com.project3.backend.reports.SalesReport;
import com.project3.backend.service.IngredientServiceImpl;
import com.project3.backend.service.ItemCategoryServiceImpl;
import com.project3.backend.service.ItemServiceImpl;
import com.project3.backend.service.OrderServiceImpl;
import com.project3.backend.service.UserServiceImpl;

@RestController
public class DatabaseController {
    @Autowired
    private ItemServiceImpl itemService;
    @Autowired
    private IngredientServiceImpl ingredientService;
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

    @GetMapping("/itemToIngredient")
    public List<Ingredient> getIngredientsByItemId(@RequestParam int itemId) {
        return ingredientService.fetchIngredientsByItemId(itemId);
    }

    @PostMapping("/ingredients")
    public void saveIngredient(@RequestBody Ingredient ingredient) {
        System.out.println("Saving ingredient: " + ingredient.toString());
        ingredientService.saveIngredient(ingredient);
    }

    @PostMapping("/orders")
    public void saveOrder(@RequestBody Order order) {
        System.out.println("Saving order: " + order.toString());
        orderService.saveOrder(order);
    }

    @PostMapping("/menuItems")
    public void saveItem(@RequestBody Item item) {
        System.out.println("Saving item: " + item.toString());
        itemService.saveItem(item);
    }

    @DeleteMapping("/menuItems")
    public void deleteItem(@RequestParam int id) {
        itemService.deleteItem(id);
    }

    @DeleteMapping("/ingredients")
    public void deleteIngredient(@RequestParam int id) {
        ingredientService.deleteIngredient(id);
    }

    @DeleteMapping("/orders")
    public void deleteOrder(@RequestParam int id) {
        orderService.deleteOrder(id);
    }

    @GetMapping("/salesReport")
    public List<SalesReport> getSalesReport(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, 
                                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return itemService.salesReport(startDate, endDate);
    }

    @GetMapping("/ingredientUsageReport")
    public List<IngredientUsageReport> getIngredientUsageReport(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, 
                                                                @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ingredientService.fetchIngredientUsageBetweenDates(startDate, endDate);
    }

    @GetMapping("/excessItems")
    public List<Item> getExcessItems(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, 
                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return itemService.excessItems(startDate, endDate);
    }

    @GetMapping("/restockReport")
    public List<RestockReport> getRestockReport() {
        return ingredientService.fetchStockLessThanRestock();
    }

    @GetMapping("/orderedTogether")
    public List<OrderedTogetherReport> getOrderedTogether(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, 
                                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return itemService.fetchItemsOrderedTogether(startDate, endDate);
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
