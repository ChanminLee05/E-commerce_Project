import React, {useEffect, useState} from "react";
import Header from "../Header";
import "./ShoppingCart.css";
import CartItem from "./CartItem";

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cartId, setCartId] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:8080/nexusHub/cart/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("data", data)
                        setCartItems(data.cartItemList);
                        setCartId(data.cartId)
                        setIsLoading(false);
                    } else {
                        console.error("Failed to fetch cart items");
                    }
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            }

        };

        fetchCartItems();
    },[]);

    const handleDeleteItem = (deletedItemId) => {
        setCartItems(prevCartItems => prevCartItems.filter(item => item.cartItemId !== deletedItemId));
    }

    return(
        <>
            <Header/>
            <div className="cart">
                <div className="cart-container">
                    <div className="cart-title-container">
                        <h3 className="cart-title">Your Items</h3>
                    </div>
                    <ul className="product-list">
                        <li className="product">
                            <div className="shopping-card">
                                {isLoading ? (
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : cartItems.length === 0 ? (
                                    <p>There are no items in your cart.</p>
                                ) :(
                                    cartItems && cartItems.map((cartItem, index) => (
                                        <CartItem
                                            key={index}
                                            cartId={cartId}
                                            cartItemId={cartItem.cartItemId}
                                            images={cartItem.images}
                                            productName={cartItem.productName}
                                            brand={cartItem.brand}
                                            price={cartItem.price}
                                            quantity={cartItem.quantity}
                                            onDelete={handleDeleteItem}
                                        />
                                    ))
                                )}
                            </div>
                        </li>
                    </ul>


                </div>
            </div>

        </>
    )
}