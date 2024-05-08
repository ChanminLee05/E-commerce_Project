import React from 'react';
import ItemListPage from "./ItemListPage";
import Header from "../Header";

const MiscellaneousPage = ({ handleSignIn, handleLogOut }) => {

    return (
        <>
            <Header handleSignIn={handleSignIn} handleLogOut={handleLogOut}/>
            <div className="fashion-page">
                <div className="filter-section"></div>
                <ItemListPage
                    categoryId={4}
                    initialItemCount={8}
                    loadMoreIncrement={20}
                />
            </div>
        </>
    );
};

export default MiscellaneousPage;