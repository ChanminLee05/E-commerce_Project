import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import ProductItem from "./ProductItem";
import {Link} from "react-router-dom";
import "../AdminPage/AdminPage.css";

const AdminPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch("http://localhost:8080/nexusHub/product", {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            }).then(data => {
            console.log("Fetched products:", data);
            setProducts(data); // Update state with fetched products
        })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to fetch products.');
            });
    };

    return (
        <div className="admin-page">
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">NexusHub ADMIN</a>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="form-control admin-form">
                <button className="btn btn-primary">
                    <Link to="/add-product" className="goToAddProduct">Add new product</Link>
                </button>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col" className="th-col">#</th>
                        <th scope="col" className="th-col">Name</th>
                        <th scope="col" className="th-col">Category</th>
                        <th scope="col" className="th-col">Description</th>
                        <th scope="col" className="th-col">Price</th>
                        <th scope="col" className="th-col">Quantity</th>
                        <th scope="col" className="th-col">Update</th>
                        <th scope="col" className="th-col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <ProductItem
                            key={index}
                            productId={product.productId}
                            productName={product.productName}
                            categoryName={product.category.categoryName}
                            description={product.description}
                            price={product.price}
                            stockQuantity={product.stockQuantity}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;