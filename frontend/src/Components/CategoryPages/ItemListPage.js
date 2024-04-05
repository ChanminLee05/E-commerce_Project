import React, {useEffect, useState} from 'react';
import Item from "./Item";

const ItemListPage = ({ apiUrl, initialItemCount, loadMoreIncrement }) => {
    const [item, setItem] = useState([]);
    const [itemToShow, setItemToShow] = useState(initialItemCount);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchPromises = apiUrl.map(url => fetch(url).then(response => response.json()));
                const dataArray = await Promise.all(fetchPromises);

                let idCounter = 1;
                const combinedItems = [];

                dataArray.forEach(data => {
                    if (Array.isArray(data.products)) {
                        // Process data from the dummyjson API
                        data.products.forEach(item => {
                            const newItem = { ...item, id: idCounter };
                            combinedItems.push(newItem);
                            idCounter++;
                        });
                    } else {
                        // Process data from the platzi fake store API
                        data.forEach(item => {
                            const newItem = { ...item, id: idCounter };
                            combinedItems.push(newItem);
                            idCounter++;
                        });
                    }
                });

                setIsLoading(false);
                setItem(combinedItems);
                console.log(combinedItems)
            } catch (error) {
                console.error('Error fetching items:', error);
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
                    item && item.length > 0 && item.slice(0, itemToShow).map((item) => (
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