import React from 'react';
import Header from "../Header";
import ItemListPage from "./ItemListPage";

const HomesPage = ({ handleSignIn, handleLogOut }) => {
    const homesApiUrl = ["https://api.escuelajs.co/api/v1/products/?categoryId=3"];

    return (
        <>
            <Header handleSignIn={handleSignIn} handleLogOut={handleLogOut}/>
            <div className="fashion-page">
                <div className="filter-section"></div>
                <ItemListPage
                    apiUrl={homesApiUrl}
                    initialItemCount={8}
                    loadMoreIncrement={0}
                />
            </div>
        </>
    );
};

export default HomesPage;