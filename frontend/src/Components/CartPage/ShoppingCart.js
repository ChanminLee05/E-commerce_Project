import React, {useState} from "react";
import Header from "../Header";
import "./ShoppingCart.css";
import ExampleImg from "../../Assets/ElectronicImg/camera.jpg";
export default function ShoppingCart() {
    const [quantity, setQuantity] = useState(1);

    function handleQuantityChange(e) {
        setQuantity(parseInt(e.target.value));
    }

    return(
        <>
            <Header/>
            <div className="cart">
                <div className="cart-container">
                    <div className="cart-title-container">
                        <h3 className="cart-title">Your Items</h3>
                    </div>
                    <ul className="product-list">
                        <li className="product">
                            <div className="card shopping-card">
                                <img src={ExampleImg} className="product-img" alt="product image"/>
                                <div className="card-body">
                                    <h5 className="card-title">Product Name</h5>
                                    <div className="quantity-container">
                                        <span className="quantity-txt">Qty:</span>
                                        <select className="form-select" value={quantity} onChange={handleQuantityChange}>
                                            {[1,2,3,4,5].map((value) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className="delete-btn">Delete</button>
                                </div>
                            </div>
                        </li>
                    </ul>


                </div>
            </div>

        </>
    )
}