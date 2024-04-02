import './Item.css';
import {useEffect, useState} from "react";


const Item = ({ id, title, images, description, price }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    function toggleDescription() {
        setShowFullDescription(!showFullDescription);
    }
    return (
        <div className="card-container">
            <div className="card">
                {images && (
                    <img src={images[0]} className="card-img-top card-images" alt={title} />
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