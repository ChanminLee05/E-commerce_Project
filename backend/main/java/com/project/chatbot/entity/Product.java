package com.project.chatbot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue
    @Column(name = "product_id")
    private int productId;

    private String product_name;
    private String description;
    private String image;
    private LocalDate orderDate;
    private double price;
    private int stock_quantity;

    @OneToMany(mappedBy = "product")
    private Set<CartItem> cartItem;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
