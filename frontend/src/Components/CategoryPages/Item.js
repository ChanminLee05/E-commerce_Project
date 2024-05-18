import './Item.css';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


const Item = ({ productId, brand, productName, imageUrl, description, price, photos }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [saveToWishlist, setSaveToWishlist] = useState(false);

    const displayImages = photos && photos.length > 0 ? photos : imageUrl;
    const imagePath = displayImages.length > 0 ? displayImages[currentImageIndex] : null;

    const handleMouseEnter = () => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                prevIndex < displayImages.length - 1 ? prevIndex + 1 : 0
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
        if (isAddingToCart) return;

        setIsAddingToCart(true);

        const data = {
            productId: productId,
            quantity: 1
        };

        const authToken = localStorage.getItem('token');

        fetch('http://localhost:8080/nexusHub/cart-item/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authToken}`
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    const addToCart = window.confirm("Do you want to add this item to your cart?")
                    if (addToCart) {
                        setIsAddingToCart(true);
                    }
                } else {
                    throw new Error('Failed to add item to cart');
                }
            })
            .then(() => {
                toast.success('Item added to cart successfully', {
                    position: "top-center",
                    draggable: true,
                    hideProgressBar: true
                });
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
                toast.error('Please login first to add item to your Cart', {
                    position: "top-center",
                    draggable: true,
                    hideProgressBar: true
                });
            })
            .finally(() => {
                setIsAddingToCart(false);
            })
    }

    function handleSaveToWishlist() {
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

        if (saveToWishlist) {
            const index = wishlistItems.indexOf(productId);
            if (index !== -1) {
                wishlistItems.splice(index, 1);
            }

            const removeFromWishList = window.confirm("Do you want to remove this item from your wishlist?");
            if (removeFromWishList) {
                localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
                setSaveToWishlist(false);
            }
        } else {
            const addToWishList = window.confirm("Do you want to add this item to your wishlist?");
            if (addToWishList) {
                wishlistItems.push(productId);
                localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
                setSaveToWishlist(true);
            }
        }
    }

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (savedWishlist.includes(productId)) {
            setSaveToWishlist(true);
        }
    }, [productId]);


    return (
        <div className="card-container">
            <div className="card">
                {displayImages && (
                    <img
                        src={imagePath}
                        className="card-img-top card-images"
                        alt={productName}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                )}
                <div className="card-body desc">
                    <p className="brand-txt">{brand}</p>
                    <h5 className="card-title">{productName}</h5>
                    <p className="product-desc">
                        {showFullDescription ? description : description.slice(0, 100)}
                        {description.length > 100 && (
                          <span className="toggle-description" onClick={toggleDescription}>
                              {showFullDescription ? '...less' : '...more'}</span>
                        )}
                    </p>
                    <h4 className="price-txt">${price.toFixed(2)}</h4>
                    <div className="add-to-cart-container">
                        <button
                            className="add-to-wishlist"
                            onClick={handleSaveToWishlist}>
                            <i className={`bi ${saveToWishlist ? 'bi-heart-fill' : 'bi-heart'} heart-icon`} id={productId}></i>
                        </button>
                        <button
                            className="add-to-cart"
                            onClick={handleAddToCart}>
                            <i className="bi bi-cart3 cart-icon" id={productId}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;