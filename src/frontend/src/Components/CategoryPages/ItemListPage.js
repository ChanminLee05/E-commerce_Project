import React, {useEffect, useState} from 'react';
import Item from "./Item";

const ItemListPage = ({ apiUrl, initialItemCount, loadMoreIncrement }) => {
    const [fashionItem, setFashionItem] = useState([]);
    const [itemToShow, setItemToShow] = useState(initialItemCount);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const responses = await Promise.all(apiUrl.map(url => fetch(url)));
                const data = await Promise.all(responses.map(response => response.json()));
                const combinedData = data.flat();

                setIsLoading(false);
                setFashionItem(combinedData);
            } catch (error) {
                console.error('Error fetching fashion items:', error);
            }
        };

        fetchItems();
    }, [apiUrl]);

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
                    fashionItem.slice(0, itemToShow).map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            images={item.images}
                            title={item.title}
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