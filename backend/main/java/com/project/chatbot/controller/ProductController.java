package com.project.chatbot.controller;

import com.project.chatbot.dto.AddProductRequest;
import com.project.chatbot.dto.ProductResponse;
import com.project.chatbot.entity.Product;
import com.project.chatbot.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/product")
    public List<ProductResponse> getAllProduct() {
        return productService.getAllProducts();
    }

    @GetMapping("/product/{product_id}")
    public ResponseEntity<ProductResponse> getProductByProductId(@PathVariable("product_id") Integer productId) {
        ProductResponse productResponse = productService.getProductByProductId(productId);
        return ResponseEntity.ok(productResponse);
    }

    @PostMapping("/product")
    public ResponseEntity<Product> addProduct(@RequestBody AddProductRequest addProductRequest) {
        Product addedProduct = productService.addProduct(addProductRequest);
        if (addedProduct != null) {
            return ResponseEntity.ok(addedProduct);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
