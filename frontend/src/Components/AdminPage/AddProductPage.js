import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import "./AddProductPage.css";
import axios from "axios";

const AddProductPage = () => {
    const [fileList, setFileList] = useState([]);

    const categories = [
        { categoryId: 1, category_name: 'Fashion & Clothes' },
        { categoryId: 2, category_name: 'Electronics' },
        { categoryId: 3, category_name: 'Home & Garden' },
        { categoryId: 4, category_name: 'Miscellaneous' }
    ];

    const [formData, setFormData] = useState({
        productName: '',
        brand: '',
        categoryId: '',
        price: '',
        stock_quantity: '',
        description: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'category_name') {
            handleCategoryChange(name, value);
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    function handleImage(event) {
        const files = event.target.files;
        if (files.length === 0) {
            setFormData(prevState => ({
                ...prevState,
                image: null
            }));
        } else {
            const fileList = Array.from(files);
            setFileList(fileList);
            setFormData(prevState => ({
                ...prevState,
                image: fileList
            }));
        }
    }

    function handleCategoryChange(value) {
        setFormData(prevState => ({
            ...prevState,
            categoryId: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('productName', formData.productName);
        formDataToSend.append('brand', formData.brand);
        formDataToSend.append('categoryId', formData.categoryId);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('stock_quantity', formData.stock_quantity);
        formDataToSend.append('description', formData.description);

        if (fileList.length > 0) {
            for (let i = 0; i < fileList.length; i++) {
                formDataToSend.append(`image`, fileList[i])
            }
        }

        try {
            const response = await axios.post('http://localhost:8080/nexusHub/product/add', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log('Product added Successfully');
                setFormData({
                    productName: '',
                    brand: '',
                    categoryId: '',
                    price: '',
                    stock_quantity: '',
                    description: ''
                });
                window.location.href = '/admin/product-control';

                toast.success('Product added Successfully', {
                    position: 'top-center',
                    draggable: true,
                    hideProgressBar: true,
                });
            } else {
                console.error('Failed to save product');
                toast.warn('Failed to save product', {
                    position: 'top-center',
                    draggable: true,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
                toast.error(`Server Error: ${error.response.data}`, {
                    position: 'top-center',
                    draggable: true,
                    hideProgressBar: true,
                });
            } else if (error.request) {
                console.error('No Response:', error.request);
                toast.error('No Response from Server', {
                    position: 'top-center',
                    draggable: true,
                    hideProgressBar: true,
                });
            } else {
                console.error('Error:', error.message);
                toast.error(`Error: ${error.message}`, {
                    position: 'top-center',
                    draggable: true,
                    hideProgressBar: true,
                });
            }
        }
    }

    return (
        <div className="add-product-page">
            <form className="add-product-form" onSubmit={handleSubmit}>
                <h1 className="add-product-title">ADD PRODUCTS</h1>
                <label>
                    <h4>PRODUCT NAME</h4>
                </label>
                <div className="input-group mb-3 input-box">
                    <textarea className="form-control" name="productName"  value={formData.productName} onChange={handleChange} required={true}></textarea>
                </div>
                <label>
                    <h4>BRAND NAME</h4>
                </label>
                <div className="input-group mb-3 input-box">
                    <textarea className="form-control" name="brand"  value={formData.brand} onChange={handleChange} required={true}></textarea>
                </div>
                <label>
                    <h4>PRODUCT CATEGORY</h4>
                </label>
                <div className="input-group mb-3 input-box">
                    <div className="btn-group">
                        <select className="form-select category-select"
                                name="category_name"
                                value={formData.categoryId}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                required={true}
                        >
                            <optgroup label="Select Category">
                                {categories.map(category => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.category_name}
                                    </option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                </div>
                <label>
                    <h4 className="">PRODUCT DESCRIPTION</h4>
                </label>
                <div className="input-group mb-3 input-box">
                    <textarea className="form-control add-product-desc" name="description" value={formData.description} onChange={handleChange} required={true}></textarea>
                </div>
                <label>
                    <h4 className="">AVAILABLE QUANTITY</h4>
                </label>
                <div className="input-group mb-3 input-box">
                    <input type="text" className="form-control" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required={true}></input>
                </div>
                <label>
                    <h4 className="">PRICE</h4>
                </label>
                <div className="input-group mb-3 input-box">
                        <span className="input-group-text price-icon">$</span>
                        <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} required={true}></input>
                </div>
                <label>
                    <h4>IMAGE</h4>
                </label>
                <div className="input-group mb-3 input-box">
                    <input type="file"
                           accept="image/*"
                           className="form-control"
                           name="image"
                           onChange={handleImage}
                           multiple>

                    </input>
                </div>
                <button type="submit" className="btn btn-primary">Save Product</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddProductPage;