import './Item.css';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


const Item = ({ id, title, images, description, price }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const handleMouseEnter = () => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
        }, 3000);
    };

    const handleMouseLeave = () => {
        setCurrentImageIndex(0);
    };

    function toggleDescription() {
        setShowFullDescription(!showFullDescription);
    }

    function handleAddToCart() {
        if (isAddingToCart) return; // Prevent multiple clicks

        setIsAddingToCart(true);

        const data = {
            product_id: id,
            productName: title,
            price: price
        };

        fetch('nexusHub/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                } else {
                    return response.json();
                }
            })
            .then(() => {
                toast.success('Item added to cart successfully');
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
                toast.error('Failed to add item to cart');
            })
            .finally(() => {
                setIsAddingToCart(false);
            })
    }

    return (
        <div className="card-container">
            <div className="card">
                {images && (
                    <img
                        src={images[currentImageIndex]}
                        className="card-img-top card-images"
                        alt={title}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                )}
                <div className="card-body desc">
                    <p className="brand-txt">NexusHub</p>
                    <h5 className="card-title">{title}</h5>
                    <p className="product-desc">
                        {showFullDescription ? description : description.slice(0, 100)}
                        {description.length > 100 && (
                          <span className="toggle-description" onClick={toggleDescription}>
                              {showFullDescription ? '...less' : '...more'}</span>
                        )}
                    </p>
                    <h4 className="price-txt">${price}</h4>
                    <div className="add-to-cart-container">
                        <button
                            className="add-to-cart"
                            onClick={handleAddToCart}>
                            <i className="bi bi-cart3 cart-icon" id={id}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;