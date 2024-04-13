import React from 'react';
import "./FashionPage.css";
import Header from "../Header";
import ItemListPage from "./ItemListPage";


const FashionPage = ({ handleSignIn, handleLogOut }) => {
    const apiUrls = [

        "https://dummyjson.com/products/category/mens-shirts",
        "https://dummyjson.com/products/category/tops",
        "https://dummyjson.com/products/category/womens-dresses",
        "https://api.escuelajs.co/api/v1/products/?categoryId=4",
        "https://dummyjson.com/products/category/womens-shoes",
        "https://dummyjson.com/products/category/mens-shoes",
        "https://dummyjson.com/products/category/mens-watches",
        "https://dummyjson.com/products/category/womens-watches",
        "https://dummyjson.com/products/category/womens-bags",
        "https://dummyjson.com/products/category/womens-jewellery",
        "https://dummyjson.com/products/category/sunglasses"


    ];

    return (
        <>
            <Header handleSignIn={handleSignIn} handleLogOut={handleLogOut}/>
            <div className="fashion-page">
                <div className="filter-section"></div>
                <ItemListPage
                    apiUrl={apiUrls}
                    initialItemCount={12}
                    loadMoreIncrement={70}
                />
            </div>
        </>
    );
};

export default FashionPage;