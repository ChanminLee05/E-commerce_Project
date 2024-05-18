import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import ProductItem from "./ProductItem";
import {Link} from "react-router-dom";
import "./ProductControlPage.css";
import MainPageSideBar from "./MainPageSideBar";

const ProductControlPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch("http://localhost:8080/nexusHub/product", {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            }).then(data => {
            console.log("Fetched products:", data);
            setProducts(data);
        })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to fetch products.');
            });
    };

    return (
        <>
            <MainPageSideBar/>
            <div className="admin-user-page">
                <div className="form-control admin-form">
                    <button className="btn btn-primary add-product-btn">
                        <Link to="/admin/add-product" className="goToAddProduct">
                            <i className="bi bi-pencil-square"></i>
                            Add new product
                        </Link>
                    </button>
                    <table className="table table-striped table-hover user-control-table">
                        <thead>
                            <tr>
                                <th scope="col" className="th-col">#</th>
                                <th scope="col" className="th-col">Name</th>
                                <th scope="col" className="th-col">Category</th>
                                <th scope="col" className="th-col">Brand</th>
                                <th scope="col" className="th-col">Description</th>
                                <th scope="col" className="th-col">Price</th>
                                <th scope="col" className="th-col">Quantity</th>
                                <th scope="col" className="th-col">Images</th>
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
                                    brand={product.brand}
                                    categoryName={product.category.categoryName}
                                    description={product.description}
                                    price={product.price}
                                    stockQuantity={product.stockQuantity}
                                    imageUrl={product.imageUrl}
                                    photos={product.photos}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ProductControlPage;