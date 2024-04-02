import React, {useState} from "react";
import Header from "./Header";
import './TechSupport.css';
import Tech from "../Assets/service.png";
import ChatBot from "./ChatBot";
export default function TechSupport() {
    const [isClicked, setIsClicked] = useState(false);

    function startChat() {
        setIsClicked(true);
    }

    function closeChat() {
        setIsClicked(false);
    }
    return(
        <>
            <Header/>
            <div className="tech-page row">
                <div className="tech-left col-6">
                    <h2 className="tech-txt1">24/7 Customer Service</h2>
                    <h4 className="tech-txt2">If you require immediate assistance, please utilize our live chat feature. Our team is readily available to provide prompt responses and support.</h4>
                </div>
                <div className="tech-right col-5">
                    <img className="right-img" src={Tech} alt="customer service"/>
                    <div className="tech-bottom">
                        <i className="bi bi-envelope-at"></i><span className="email-txt">support@gmail.com</span>
                        <i className="bi bi-telephone-fill"></i><span className="phone-txt">+1-800-123-4567</span>
                    </div>
                </div>
            </div>
            <div className="tech-chat-container">
                {isClicked ? (
                    <ChatBot onClose={closeChat} />
                ) : (
                    <button type="button" className="btn btn-primary tech-chat-btn" onClick={startChat}>
                        Need Help?
                    </button>
                )}
            </div>
        </>
    )
}