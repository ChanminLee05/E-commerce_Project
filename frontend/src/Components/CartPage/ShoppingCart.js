import React, {useEffect, useState} from "react";
import Header from "../Header";
import "./ShoppingCart.css";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import Cart from '../../Assets/shopping-cart.png';

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cartId, setCartId] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            handleLoginRedirect();
            return;
        }

        fetchCartItems(userId);
    },[]);

    const fetchCartItems = async (userId) => {

        if (userId) {
            try {
                const response = await fetch(`http://localhost:8080/nexusHub/cart/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data.cartItemList);
                    setCartId(data.cartId)
                    setIsLoading(false);
                } else if (response.status === 404) {
                    handleLoginRedirect();
                } else {
                    console.error("Error fetching cart items:", response.statusText);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setIsLoading(false);
            }
        }
    };

    function handleLoginRedirect () {
        window.alert("Please Login First");
        navigate("/main");
    }

    const handleDeleteItem = (deletedItemId) => {
        toast.success("Item deleted from your cart", {
                position: "top-center",
                draggable: true,
                hideProgressBar: true
            }
        )
        setCartItems(prevCartItems => prevCartItems.filter(item => item.cartItemId !== deletedItemId));
    }

    const handleQuantityChange = (cartItemId, newQuantity) => {
        setCartItems(prevCartItems =>
            prevCartItems.map(item =>
                item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    useEffect(() => {
        const newSubTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity, 0
        );
        setSubTotal(newSubTotal);
    }, [cartItems]);

    return(
        <>
            <Header/>
            <div className="cart row">
                <div className="cart-container col-7">
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
                                    <>
                                        <p>There are no items in your cart.</p>
                                        <img src={Cart} alt="shopping cart" className="shopping-cart-icon"/>
                                    </>
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
                                            photos={cartItem.photos}
                                            quantity={cartItem.quantity}
                                            onDelete={handleDeleteItem}
                                            onQuantityChange={handleQuantityChange}
                                        />
                                    ))
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="total-container col-2">
                    <div className="price-container">
                        <h4 className="total-txt">Subtotal:</h4>
                        <h4 className="total-amount">${subTotal.toFixed(2)}</h4>
                    </div>
                    <div className="proceed-container">
                        <button className="btn btn-primary proceed-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}