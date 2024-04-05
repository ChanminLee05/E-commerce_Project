package com.project.chatbot.controller;

import com.project.chatbot.dto.AddCartRequest;
import com.project.chatbot.dto.AddProductRequest;
import com.project.chatbot.entity.CartItem;
import com.project.chatbot.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class CartItemController {

    private final CartService cartService;

    @GetMapping("/cart")
    public List<CartItem> getAllProduct() {
        return cartService.getAllCartItems();
    }

    @GetMapping("/cart/{cart_id}")
    public ResponseEntity<CartItem> getCartItemByCartItemId(@PathVariable("cart_id") int cartItemId) {
        return cartService.getCartItemByCartItemId(cartItemId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/cart")
    public ResponseEntity<CartItem> addProduct(@RequestBody AddCartRequest addCartRequest) {
        CartItem addedCartItem = cartService.addCartItem(addCartRequest);
        if (addedCartItem != null) {
            return ResponseEntity.ok(addedCartItem);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
