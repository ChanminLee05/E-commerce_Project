package com.project.chatbot.repository;

import com.project.chatbot.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p")
    List<Product> findAllProducts();

    @Query("SELECT p FROM Product p WHERE p.productId = :productId")
    Optional<Product> findProductByProductId(Integer productId);

    @Query("SELECT COUNT(p) > 0 FROM Product p WHERE p.productId = :productId")
    boolean existsByProductId(@Param("productId") Integer productId);
}
