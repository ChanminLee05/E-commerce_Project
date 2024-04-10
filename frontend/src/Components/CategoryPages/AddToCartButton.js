import React from 'react';

const AddToCartButton = ({ item }) => {
    const handleAddToCart = () => {
        const confirmed = window.confirm('Do you want to add this item to the cart?');
        if (confirmed) {
            // Make API call to add item to cart
            fetch("http://localhost:8080/nexusHub/cart/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ item })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add item to cart');
                    }
                    // Handle success (e.g., show toast message)
                })
                .catch(error => {
                    console.error(error);
                    // Handle error (e.g., show error toast message)
                });
        }
    };

    return (
        <button onClick={handleAddToCart}>Add to Cart</button>
    );
};

export default AddToCartButton;