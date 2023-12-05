package com.project3.backend.reports;

public interface ItemToOrderwithQuantity {
    int getId();
    String getName();
    double getPrice();
    boolean getVegan();
    boolean getGlutenFree();
    int getCategoryId();
    String getSize();
    boolean getExtraSauce();
    String getImageUrl();
    int getQuantity();
}
