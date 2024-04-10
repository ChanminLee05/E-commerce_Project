import React, {useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import "./AddProductPage.css";

const AddProductPage = () => {
    const categories = [
        { categoryId: 1, category_name: 'Fashion & Clothes' },
        { categoryId: 2, category_name: 'Electronics' },
        { categoryId: 3, category_name: 'Home & Garden' },
        { categoryId: 4, category_name: 'Miscellaneous' }
    ];

    const [formData, setFormData] = useState({
        productName: '',
        categoryId: '',
        price: '',
        stock_quantity: '',
        description: '',
        // image: null
    });

    function handleChange(e) {
        const { name, value, files } = e.target;
        console.log(`Changing ${name} to ${value}`);
        if (name === 'category_name') {
            const selectedCategory = categories.find(category => category.category_name === value);
            setFormData(prevState => ({
                ...prevState,
                category_name: value,
                categoryId: selectedCategory ? selectedCategory.categoryId : ''
            }));
        // } else if (files) {
        //     console.log(`Found file: ${files[0].name}`);
        //     setFormData(prevState => ({
        //         ...prevState,
        //         [name]: files[0] // Store the file object
        //     }));
        } else {
            console.log(`Setting ${name} to ${value}`);
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        fetch("http://localhost:8080/nexusHub/product/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Set the content type to JSON
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
            if (response.ok) {
                console.log('Product added Successfully');
                setFormData({
                    productName: '',
                    categoryId: '',
                    price: '',
                    stock_quantity: '',
                    description: ''
                });
                response.json().then(data => {
                    toast.success('Product added Successfully', {
                        position: "top-center",
                        draggable: true,
                        hideProgressBar: true
                    });
                })
            } else {
                console.error('Failed to save product');
                toast.warn('Failed to save product', {
                        position: "top-center",
                        draggable: true,
                        hideProgressBar: true
                    }
                );
            }
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="add-product-page">
            <form className="add-product-form" onSubmit={handleSubmit}>
                <h1>ADD PRODUCTS</h1>
                <label>
                    <h4>PRODUCT NAME</h4>
                </label>
                <div className="input-group mb-3 input-box">
                    <input type="text" className="form-control" name="productName"  value={formData.productName} onChange={handleChange} required={true}></input>
                </div>
                <label>
                    <h4>PRODUCT CATEGORY</h4>
                </label>
                <div className="input-group mb-3 input-box">
                    <div className="btn-group">
                        <select className="form-select category-select" name="categoryId" value={formData.categoryId} onChange={handleChange} required={true}>
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <label>
                    <h4 className="">PRODUCT DESCRIPTION</h4>
                </label>
                <div className="input-group mb-3 input-box">
                    <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} required={true}></input>
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
                    <input type="file" className="form-control" name="image" id="formFileSm" onChange={handleChange}></input>
                </div>
                <button type="submit" className="btn btn-primary">Save Product</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddProductPage;