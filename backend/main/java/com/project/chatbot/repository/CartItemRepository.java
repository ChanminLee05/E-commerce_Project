package com.project.chatbot.repository;

import com.project.chatbot.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    @Query("SELECT ci FROM CartItem ci")
    List<CartItem> findAllCartItem();

    @Query("SELECT ci FROM CartItem ci WHERE ci.cartId = :cartId")
    Optional<CartItem> findCartItemByCartItemId(int cartId);

    @Query("SELECT COUNT(ci) > 0 FROM CartItem ci WHERE ci.cartId = :cartId")
    boolean existsByCartItemId(@Param("cartId") int cartId);

}
