import React from 'react';
import "./FashionPage.css";
import Header from "../Header";
import ItemListPage from "./ItemListPage";


const FashionPage = ({ handleSignIn, handleLogOut }) => {

    return (
        <>
            <Header handleSignIn={handleSignIn} handleLogOut={handleLogOut}/>
            <div className="fashion-page">
                <div className="filter-section"></div>
                <ItemListPage
                    categoryId={1}
                    initialItemCount={12}
                    loadMoreIncrement={70}
                />
            </div>
        </>
    );
};

export default FashionPage;