package com.project.chatbot.controller;

import com.project.chatbot.dto.AddCartRequest;
import com.project.chatbot.entity.CartItem;
import com.project.chatbot.service.CartService;
import com.project.chatbot.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
public class CartItemController {

    private final CartService cartService;
    private final JwtService jwtService;

    @GetMapping("/cart")
    @PreAuthorize("hasAnyAuthority('admin:read', 'user:read')")
    public List<CartItem> getAllProduct() {
        return cartService.getAllCartItems();
    }

    @GetMapping("/cart/{cart_id}")
    @PreAuthorize("hasAnyAuthority('admin:read', 'user:read')")
    public ResponseEntity<CartItem> getCartItemByCartItemId(@PathVariable("cart_id") int cartItemId) {
        return cartService.getCartItemByCartItemId(cartItemId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/cart/user")
    @PreAuthorize("hasAnyAuthority('admin:read', 'user:read')")
    public ResponseEntity<List<CartItem>> getCartItemsForCurrentUser(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwtToken);

        List<CartItem> cartItems = cartService.getCartItemsForUser(username);

        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/cart/add")
    @PreAuthorize("hasAnyAuthority('admin:post', 'user:post')")
    public ResponseEntity<CartItem> addProduct(@RequestBody AddCartRequest addCartRequest) {
        if (addCartRequest.getProductId() <= 0 || addCartRequest.getQuantity() <= 0) {
            return ResponseEntity.badRequest().build();
        }

        CartItem addedCartItem = cartService.addCartItem(addCartRequest);
        if (addedCartItem != null) {
            return ResponseEntity.ok(addedCartItem);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

//    @PostMapping("/cart")
//    @PreAuthorize("hasAnyAuthority('admin:post', 'user:post')")
//    public ResponseEntity<CartItem> addProduct(@RequestBody AddCartRequest addCartRequest) {
//        CartItem addedCartItem = cartService.addCartItem(addCartRequest);
//        if (addedCartItem != null) {
//            return ResponseEntity.ok(addedCartItem);
//        } else {
//            return ResponseEntity.badRequest().build();
//        }
//    }

//    @DeleteMapping("/cart/delete/{productId}")
//    public

}
