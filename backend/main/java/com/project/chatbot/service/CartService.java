package com.project.chatbot.service;

import com.project.chatbot.dto.AddCartRequest;
import com.project.chatbot.dto.CategoryResponse;
import com.project.chatbot.dto.ProductResponse;
import com.project.chatbot.entity.CartItem;
import com.project.chatbot.entity.Category;
import com.project.chatbot.entity.Product;
import com.project.chatbot.entity.User;
import com.project.chatbot.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public CartService(CartItemRepository cartItemRepository, ProductService productService, UserService userService) {
        this.cartItemRepository = cartItemRepository;
        this.productService = productService;
        this.userService = userService;
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAllCartItem();
    }

    public Optional<CartItem> getCartItemByCartItemId(int cartItemId) {
        if (cartItemRepository.existsByCartItemId(cartItemId)) {
            return cartItemRepository.findCartItemByCartItemId(cartItemId);
        }
        return Optional.empty();
    }

    public CartItem addCartItem(AddCartRequest addCartRequest) {
        ProductResponse productResponse = productService.getProductByProductId(addCartRequest.getProductId());

        if (productResponse != null ) {

            CartItem cartItem = CartItem.builder()
                    .product(mapToProduct(productResponse))
                    .quantity(addCartRequest.getQuantity())
                    .build();

            return cartItemRepository.save(cartItem);
        } else {
            throw new IllegalArgumentException("Product or User not found");
        }
    }

    private Product mapToProduct(ProductResponse productResponse) {
        return Product.builder()
                .productId(productResponse.getProductId())
                .product_name(productResponse.getProductName())
                .description(productResponse.getDescription())
                .image(productResponse.getImage())
                .orderDate(productResponse.getOrderDate())
                .price(productResponse.getPrice())
                .stock_quantity(productResponse.getStockQuantity())
                .category(mapToCategory(productResponse.getCategory()))
                .build();
    }

    private Category mapToCategory(CategoryResponse categoryResponse) {
        return Category.builder()
                .categoryId(categoryResponse.getCategoryId())
                .category_name(categoryResponse.getCategoryName())
                .build();
    }

    public List<CartItem> getCartItemsForUser(String username) {
        return cartItemRepository.findCartItemByUserUsername(username);
    }
}
