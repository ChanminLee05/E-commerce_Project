import React, {useEffect, useState} from 'react';
import Item from "./Item";

const ItemListPage = ({ categoryId, initialItemCount, loadMoreIncrement }) => {
    const [items, setItems] = useState([]);
    const [itemToShow, setItemToShow] = useState(initialItemCount);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/nexusHub/product/category/${categoryId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }
                const data = await response.json();
                console.log(data);
                setItems(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [categoryId]);

    function handleLoadMoreClick() {
        setItemToShow(prev => prev + loadMoreIncrement);
        const loadBtn = document.querySelector(".loadbtn");
        loadBtn.style.display = "none";
    }

    return (
        <div className="fashion-form">
            <h2 className="fashion-title">New Arrivals</h2>
            <div className="item-list">
                {isLoading ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    items.slice(0, itemToShow).map((item, index) => (
                        <Item
                            key={index}
                            productId={item.productId}
                            productName={item.productName}
                            brand={item.brand}
                            imageUrl={item.imageUrl}
                            photos={item.photos}
                            price={item.price}
                            description={item.description}
                        />
                    ))
                )}
            </div>
            {loadMoreIncrement > 0 && (
                <div className="loadbtn-container">
                    <button type="button" className="loadbtn btn btn-dark" onClick={handleLoadMoreClick}>
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default ItemListPage;