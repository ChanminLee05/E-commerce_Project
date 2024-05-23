import React from 'react';
import Header from "../Header";
import ItemListPage from "./ItemListPage";

const HomesPage = ({ handleSignIn, handleLogOut }) => {

    return (
        <>
            <Header handleSignIn={handleSignIn} handleLogOut={handleLogOut}/>
            <div className="fashion-page">
                <div className="filter-section"></div>
                <ItemListPage
                    categoryId={3}
                    initialItemCount={8}
                    loadMoreIncrement={20}
                />
            </div>
        </>
    );
};

export default HomesPage;