import React from 'react';
import Header from "../Header";
import ItemListPage from "./ItemListPage";

const ElectronicsPage = ({ handleSignIn, handleLogOut }) => {
    const electronicsApiUrl = ["https://api.escuelajs.co/api/v1/products/?categoryId=2"];

    return (
        <>
            <Header handleSignIn={handleSignIn} handleLogOut={handleLogOut}/>
            <div className="fashion-page">
                <div className="filter-section"></div>
                <ItemListPage
                    apiUrl={electronicsApiUrl}
                    initialItemCount={8}
                    loadMoreIncrement={2}
                />
            </div>
        </>
    );
};

export default ElectronicsPage;