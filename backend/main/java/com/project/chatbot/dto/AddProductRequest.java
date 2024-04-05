package com.project.chatbot.dto;

import com.project.chatbot.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddProductRequest {
    private int categoryId;
    private String title;
    private double price;
    private String description;
    private String image;
}
