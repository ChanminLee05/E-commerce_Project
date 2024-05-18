import React from 'react';
import {Link} from "react-router-dom";
import "../AdminPage/MainPageSideBar.css";

const MainPageSideBar = () => {
    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar-title-container">
                        <i className="bi bi-database"></i>
                        <a className="navbar-brand admin-logo" href="/admin/main">NEXUSHUB ADMIN</a>
                    </div>
                    <button className="navbar-toggler toggle-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header admin-side-bar-header">
                            <h5 className="offcanvas-title admin-side-bar-title" id="offcanvasNavbarLabel">NEXUSHUB</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item admin-side-bar-item">
                                    <Link to="/admin/main" className="admin-side-bar-link">
                                        <i className="bi bi-grid-fill admin-side-bar-icon"></i>
                                        <h4 className="admin-side-bar-txt">DASHBOARD</h4>
                                    </Link>
                                </li>
                                <li className="nav-item admin-side-bar-item">
                                    <Link to="/admin/product-control" className="admin-side-bar-link">
                                        <i className="bi bi-gear-fill admin-side-bar-icon"></i>
                                        <h4 className="admin-side-bar-txt">MANAGE PRODUCT</h4>
                                    </Link>
                                </li>
                                <li className="nav-item admin-side-bar-item">
                                    <Link to="/admin/user-control" className="admin-side-bar-link">
                                        <i className="bi bi-person-circle admin-side-bar-icon"></i>
                                        <h4 className="admin-side-bar-txt">MANAGE USER</h4>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MainPageSideBar;