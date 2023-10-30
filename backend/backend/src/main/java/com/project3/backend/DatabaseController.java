package com.project3.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DatabaseController {
    @GetMapping("/database")
    public String getDatabase() {
        System.out.println("Hello World!");
        return "Hello World!";
    }
}
