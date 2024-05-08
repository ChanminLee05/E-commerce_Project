import React, {useEffect, useState} from 'react';
import './CartItem.css';

const CartItem = ({ cartId, cartItemId, productName, brand, images, price, onDelete }) => {
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState([]);

    function handleQuantityChange(e) {
        setQuantity(parseInt(e.target.value));
    }

    async function deleteItemFromCart() {
        try {
            const deleteItem = window.confirm("Are you sure you want to delete the item from your cart?");
            if (!deleteItem) return;

            const response = await fetch(`http://localhost:8080/nexusHub/cart-item/delete?cartId=${cartId}&cartItemId=${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete item from cart');
            }

            console.log('Item deleted successfully');
            onDelete(cartItemId);

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    return (
        <div className="cart-item-container">
            <div className="cart-item">
                {images && (
                    <img
                        src={images[0]}
                        className="cart-item-card-images"
                        alt={productName}
                    />
                )}
                <div className="card-body cart-item-desc">
                    <p className="cart-item-brand-txt">{brand}</p>
                    <h5 className="cart-item-productName">{productName}</h5>
                    <h4 className="cart-item-price-txt">${price}</h4>
                    <div className="quantity-container">
                        <span className="quantity-txt">Qty:</span>
                        <select className="form-select select-quantity" value={quantity} onChange={handleQuantityChange}>
                            {[1,2,3,4,5,6,7,8,9,10].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="delete-btn" onClick={deleteItemFromCart}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;