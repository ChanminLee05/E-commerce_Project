import React from 'react';
import "./FashionPage.css";
import Header from "../Header";
import ItemListPage from "./ItemListPage";


const FashionPage = ({ handleSignIn, handleLogOut }) => {
    const apiUrls = [
        "https://api.escuelajs.co/api/v1/products/?categoryId=1",
        "https://api.escuelajs.co/api/v1/products/?categoryId=4"
    ];

    return (
        <>
            <Header handleSignIn={handleSignIn} handleLogOut={handleLogOut}/>
            <div className="fashion-page">
                <div className="filter-section"></div>
                <ItemListPage
                    apiUrl={apiUrls}
                    initialItemCount={8}
                    loadMoreIncrement={6}
                />
            </div>
        </>
    );
};

export default FashionPage;