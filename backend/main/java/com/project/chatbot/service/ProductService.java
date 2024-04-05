package com.project.chatbot.service;

import com.project.chatbot.dto.AddProductRequest;
import com.project.chatbot.dto.CategoryResponse;
import com.project.chatbot.dto.ProductResponse;
import com.project.chatbot.entity.Category;
import com.project.chatbot.entity.Product;
import com.project.chatbot.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAllProducts();
        return products.stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse mapToProductResponse(Product product) {
        CategoryResponse categoryResponse = mapToCategoryResponse(product.getCategory());
        return ProductResponse.builder()
                .productId(product.getProductId())
                .productName(product.getProduct_name())
                .description(product.getDescription())
                .image(product.getImage())
                .orderDate(product.getOrderDate())
                .price(product.getPrice())
                .stockQuantity(product.getStock_quantity())
                .category(categoryResponse)
                .build();
    }

    private CategoryResponse mapToCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategory_name())
                .build();
    }

    public ProductResponse getProductByProductId(int productId) {
        Optional<Product> productOptional = productRepository.findProductByProductId(productId);
        Product product = productOptional.orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return mapToProductResponse(product);
    }

    public Product addProduct(AddProductRequest addProductRequest) {
        Random random = new Random();
        int randomQuantity = random.nextInt(1000);

        Optional<CategoryResponse> categoryOptional = categoryService.getCategoryByCategoryId(addProductRequest.getCategoryId());

        if (categoryOptional.isPresent()) {
            CategoryResponse categoryResponse = categoryOptional.get();
            Category category = new Category();
            category.setCategoryId(categoryResponse.getCategoryId());
            category.setCategory_name(categoryResponse.getCategoryName());

            Product product = Product.builder()
                    .category(category)
                    .product_name(addProductRequest.getTitle())
                    .price(addProductRequest.getPrice())
                    .description(addProductRequest.getDescription())
                    .image(addProductRequest.getImage())
                    .orderDate(LocalDate.now())
                    .stock_quantity(randomQuantity)
                    .build();

            return productRepository.save(product);
        } else {
            throw new IllegalArgumentException("Category not found");
        }
    }
}
