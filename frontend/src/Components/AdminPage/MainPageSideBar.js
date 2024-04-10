import React from 'react';
import {Link} from "react-router-dom";
import "../AdminPage/MainPageSideBar.css";

const MainPageSideBar = () => {
    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand admin-logo" href="/admin/product-control">NexusHub ADMIN</a>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">NEXUSHUB DASHBOARD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/product-control">PRODUCT CONTROL</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/user-control">USER CONTROL</Link>
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