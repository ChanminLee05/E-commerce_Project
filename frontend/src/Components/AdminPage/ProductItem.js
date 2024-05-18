import React, {useState} from 'react';
import "../AdminPage/ProductItem.css";
import axios from "axios";

const ProductItem = ({productId, productName, categoryId, categoryName, brand, description, price, stockQuantity, imageUrl, photos }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fileList, setFileList] = useState([]);

    const displayImages = photos && photos.length > 0 ? photos : imageUrl;
    const imagePath = displayImages.length > 0 ? displayImages[currentImageIndex] : null;

    const categories = [
        { categoryId: 1, category_name: 'Fashion & Clothes' },
        { categoryId: 2, category_name: 'Electronics' },
        { categoryId: 3, category_name: 'Home & Garden' },
        { categoryId: 4, category_name: 'Miscellaneous' }
    ];

    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        brand:'',
        categoryId: '',
        price: '',
        stockQuantity: '',
        description: '',
        imageUrl: [],
        photos: []
    });

    const handleMouseEnter = () => {
        if (displayImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex(prevIndex =>
                    prevIndex < displayImages.length - 1 ? prevIndex + 1 : 0
                );
            }, 1000);

            setTimeout(() => {
                clearInterval(interval);
            }, 3000);
        }
    };

    const handleMouseLeave = () => {
        setCurrentImageIndex(0);
    };

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
                photos: null
            }));
        } else {
            const fileList = Array.from(files);
            setFileList(fileList);
            setFormData(prevState => ({
                ...prevState,
                photos: fileList
            }));
        }
    }

    function handleCategoryChange(value) {
        setFormData(prevState => ({
            ...prevState,
            categoryId: value
        }));
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setFileList([]);
        setFormData({
            productId,
            productName,
            categoryId,
            brand,
            description,
            price,
            stockQuantity,
            imageUrl: [],
            photos: []
        });
    };

    async function handleUpdate(e) {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('productName', formData.productName);
        formDataToSend.append('brand', formData.brand);
        formDataToSend.append('categoryId', formData.categoryId);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('stock_quantity', formData.stockQuantity);
        formDataToSend.append('description', formData.description);

        if (fileList.length > 0) {
            for (let i = 0; i < fileList.length; i++) {
                formDataToSend.append(`image`, fileList[i])
            }
        }

        const updateConfirmMessage = window.confirm("Are you sure you want to update this product?");
        if (updateConfirmMessage) {
            try {
                const response = await axios.put(`http://localhost:8080/nexusHub/product/update/${productId}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Response from server:', response);

                if (response.status === 200) {
                    window.alert('Product updated Successfully');

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)

                } else {
                    window.alert('Failed to update product');
                }
            } catch(error) {
                if (error.response) {
                    console.error('Server Error:', error.response.data);
                    window.alert(`Server Error: ${error.response.data}`);
                } else if (error.request) {
                    console.error('No Response:', error.request);
                    window.alert('No Response from Server');
                } else {
                    console.error('Error:', error.message);
                    window.alert(`Error: ${error.message}`);
                }
            }
        } else {
            window.location.reload();
        }
    }

    function handleDelete(e) {
        e.preventDefault();
        const deleteConfirmMessage = window.confirm("Are you sure you want to delete this product?");
        if (deleteConfirmMessage) {
            fetch(`http://localhost:8080/nexusHub/product/delete/${productId}`, {
                method: "DELETE"
            })
                .then((response) => {
                    if (response.ok) {
                        window.alert('Product deleted Successfully');

                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)

                    } else {
                        console.error('Failed to delete product');
                        window.alert('Failed to delete product');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    window.alert('Error occurred while deleting product');
                });
        }
    }

    return (
        <tr>
            <td className="tr-col product-info-txt">{productId}</td>
            <td className="tr-col product-info-txt">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        multiple
                    />
                ) : (
                    productName
                )}
            </td>
            <td className="tr-col product-info-txt">
                {isEditing ? (
                    <select
                        className="form-select category-select"
                        name="category_name"
                        value={formData.categoryId}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                        <optgroup label="Select Category" autoFocus>
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.category_name}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                ) : (
                    categoryName
                )}
            </td>
            <td className="tr-col product-info-txt">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />
                ) : (
                    brand
                )}
            </td>
            <td className="tr-col product-info-txt">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                ) : (
                    description
                )}
            </td>
            <td className="tr-col product-info-txt">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                ) : (
                    price
                )}
            </td>
            <td className="tr-col product-info-txt">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        accept="image/*"
                        multiple
                    />
                ) : (
                    stockQuantity
                )}
            </td>
            <td className="tr-col product-info-txt">
                {isEditing ? (
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleImage}
                        accept="image/*"
                        multiple
                    />
                ) : displayImages.length > 0 ? (
                    <img
                        className="product-info-img"
                        src={imagePath}
                        alt={productName}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                ) : null}
            </td>
            <td className="tr-col product-info-txt">
                {isEditing ? (
                    <button className="btn btn-primary update-btn" onClick={handleUpdate}>UPDATE</button>
                ) : (
                    <button className="btn btn-primary update-btn" onClick={toggleEditMode}>EDIT</button>
                )}
            </td>
            <td className="tr-col product-info-txt"><button className="btn btn-danger delete-product-btn" onClick={handleDelete}>DELETE</button></td>
        </tr>
    );
};

export default ProductItem;