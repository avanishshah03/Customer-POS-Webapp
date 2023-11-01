package com.project3.backend.entity;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class ItemToOrder {
    @Id
    int id;
    int itemId;
    int orderId;
    int quantity;

}
