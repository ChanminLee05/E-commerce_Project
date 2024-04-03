import './Item.css';
import {useEffect, useState} from "react";


const Item = ({ id, title, images, description, price }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
                        <button className="add-to-cart"><i className="bi bi-cart3 cart-icon" id={id}></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;