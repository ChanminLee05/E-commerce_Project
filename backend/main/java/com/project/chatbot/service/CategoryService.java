package com.project.chatbot.service;

import com.project.chatbot.dto.AddCategoryRequest;
import com.project.chatbot.dto.CategoryResponse;
import com.project.chatbot.entity.Category;
import com.project.chatbot.entity.Product;
import com.project.chatbot.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> getAllCategories() {

        List<Category> categories = categoryRepository.findAllCategories();
        return categories.stream()
                .map(category -> CategoryResponse.builder()
                        .categoryId(category.getCategoryId())
                        .categoryName(category.getCategory_name())
                        .build())
                .collect(Collectors.toList());
    }

    public Optional<CategoryResponse> getCategoryByCategoryId(int categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findProductByCategoryId(categoryId);
        return categoryOptional.map(this::mapToCategoryResponse);
    }

    private CategoryResponse mapToCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategory_name())
                .build();
    }

    public CategoryResponse addCategory(AddCategoryRequest addCategoryRequest) {

        Category category = Category.builder()
                .category_name(addCategoryRequest.getTitle())
                .build();

        Category addedCategory = categoryRepository.save(category);
        return CategoryResponse.builder()
                .categoryId(addedCategory.getCategoryId())
                .categoryName(addedCategory.getCategory_name())
                .build();
    }
}
