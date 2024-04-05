package com.project.chatbot.controller;

import com.project.chatbot.dto.AddCategoryRequest;
import com.project.chatbot.dto.CategoryResponse;
import com.project.chatbot.entity.Category;
import com.project.chatbot.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/category")
    public List<CategoryResponse> getAllProduct() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/category/{category_id}")
    public ResponseEntity<CategoryResponse> getCategoryByCategoryId(@PathVariable("category_id") int categoryId) {
        return categoryService.getCategoryByCategoryId(categoryId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/category")
    public ResponseEntity<CategoryResponse> addProduct(@RequestBody AddCategoryRequest addCategoryRequest) {
        CategoryResponse addedCategory = categoryService.addCategory(addCategoryRequest);
        if (addedCategory != null) {
            CategoryResponse categoryResponse = CategoryResponse.builder()
                    .categoryId(addedCategory.getCategoryId())
                    .categoryName(addedCategory.getCategoryName())
                    .build();
            return ResponseEntity.ok(addedCategory);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
