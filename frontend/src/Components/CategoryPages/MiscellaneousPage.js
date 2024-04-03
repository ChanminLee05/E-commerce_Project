import React from 'react';
import ItemListPage from "./ItemListPage";
import Header from "../Header";

const MiscellaneousPage = ({ handleSignIn, handleLogOut }) => {
    const apiUrls = [
        "https://api.escuelajs.co/api/v1/products/?categoryId=5",
        "https://dummyjson.com/products/category/fragrances",
        "https://dummyjson.com/products/category/skincare"

    ];

    return (
        <>
            <Header handleSignIn={handleSignIn} handleLogOut={handleLogOut}/>
            <div className="fashion-page">
                <div className="filter-section"></div>
                <ItemListPage
                    apiUrl={apiUrls}
                    initialItemCount={8}
                    loadMoreIncrement={20}
                />
            </div>
        </>
    );
};

export default MiscellaneousPage;