import React, {useState} from 'react';
import "./MainPage.css";
import Header from "./Header";
import ChatBot from "./ChatBot";
export default function MainPage() {
    const [isClicked, setIsClicked] = useState(false);

    function startChat() {
        setIsClicked(true);
    }

    function closeChat() {
        setIsClicked(false);
    }

    return (
        <>
            <Header/>
            <div className="main-page">
                <div className="main-txt-container">
                    <h4 className="main-txt1">Trade-in-offer</h4>
                    <h2 className="main-txt2">Super value deals</h2>
                    <h1 className="main-txt3">On all products</h1>
                    <p className="main-txt4">Save more with coupons up to 70% off!</p>
                </div>
                <div className="chat-container">
                    {isClicked ? (
                        <ChatBot onClose={closeChat} />
                    ) : (
                        <button type="button" className="btn btn-primary chat-btn" onClick={startChat}>
                            Need Help?
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}