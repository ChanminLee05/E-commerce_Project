import React, {useEffect, useState} from 'react';
import "./ChatBot.css";
import {Link} from "react-router-dom";
import { chatResponseObjects } from './ChatBotResponse';
import RobotDog from '../Assets/robot-dog.png';
import RobotAssistant from '../Assets/robot-assistant.png';
import Robot from '../Assets/robot.png';


export default function ChatBot({ onClose }) {
    const [isOpen, setIsOpen] = useState(true);
    const [chatMessages, setChatMessages] = useState(() => {
        const storedMessages = localStorage.getItem('chatMessages');
        return storedMessages ? JSON.parse(storedMessages) : [];
    });

    function closeChat() {
        setIsOpen(false);
        onClose();
    }

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    }, [chatMessages]);

    useEffect(() => {
        const messageInput = document.getElementById("messageInput");
        const submitButton = document.getElementById("submitButton");

        function handleKeyDown(event) {
            if (event.key === "Enter" && !event.shiftKey) {
                sendMessage();
                event.preventDefault(); // Prevent the default Enter key behavior (e.g., line break)
            } else if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault(); // Prevent the default Enter key behavior
                // Insert a newline character in the textarea
                const currentPos = messageInput.selectionStart;
                const text = messageInput.value;
                const newText = text.substring(0, currentPos) + "\n" + text.substring(currentPos);
                messageInput.value = newText;
            }
        }

        function handleButtonClick() {
            sendMessage();
        }

        function handleInputChange() {
            submitButton.style.visibility = messageInput.value.trim() !== "" ? "visible" : "hidden";
        }

        messageInput.addEventListener("keydown", handleKeyDown);
        submitButton.addEventListener("click", handleButtonClick);
        messageInput.addEventListener("input", handleInputChange);

        window.addEventListener("beforeunload", clearChatHistory);
        return () => {
            messageInput.removeEventListener("keydown", handleKeyDown);
            submitButton.removeEventListener("click", handleButtonClick);
            messageInput.removeEventListener("input", handleInputChange);
        };
    }, []);

    // Add a function to handle sending the message
    function sendMessage() {
        const messageInput = document.getElementById("messageInput");
        const message = messageInput.value.trim();

        if (message !== "") {
            // Append the user message to the chatMessages list
            setChatMessages(prevMessages => [...prevMessages, {text: message, type: 'user'}]);

            // Show loading message
            const loadingMessage = createLoadingMessage();
            setChatMessages(prevMessages => [...prevMessages, loadingMessage]);

            // Check if there is a predefined response for the user's input
            const response = getPredefinedResponse(message);

            if (response) {
                // Append the chatbot response to the chatMessages list with a delay
                setTimeout(() => {
                    setChatMessages(prevMessages => [
                        ...prevMessages.filter(msg => msg !== loadingMessage),
                        {text: response, type: 'bot'}
                    ]);
                }, 1000);
            }

            // Reset the input
            messageInput.value = "";
        }
    }

    function clearChatHistory() {
        localStorage.removeItem('chatMessages');
    }

    // Function to check if there is a predefined response for the user's input
    function getPredefinedResponse(userInput) {
        const lowerCaseInput = userInput.toLowerCase();

        for (let i = 0; i < chatResponseObjects.length; i++) {
            const question = chatResponseObjects[i].question;
            const response = chatResponseObjects[i].response;

            if ((typeof question === 'string' && lowerCaseInput === question.toLowerCase()) ||
                (question instanceof RegExp && question.test(userInput))) {
                if (typeof response === 'function') {
                    return response();
                } else {
                    return response;
                }
            }
        }

        return null;
    }

    function createLoadingMessage() {
        return { text: <div className="message loading"><span className="bi bi-three-dots"></span></div>, type: 'loading' };
    }

    return (
        <div className="chatbot" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="chatbot-header">
                <button type="button" className="btn-close close-btn" aria-label="Close" onClick={closeChat}></button>
                <img src={Robot} alt="robot" className="header-robot"/>
                <span className="chatbot-name">Virtual Assistant</span>
            </div>
            <div className="chatBox">
                <div className="initial-message-container">
                    <img className="robot-dog" src={RobotDog} alt="robot-dog"/>
                    <div className="initial-message">
                        <p id="chatbotInitialMessage" className="message1">I am <b>NexusBot</b></p>
                    </div>
                </div>
                <div className="quick-link-container">
                    <p className="quick-message">How can I help you?</p>
                    <ul className="quick-link-list">
                        <li className="link-item"><Link to="/tech-support" className="tech-support-link"><b>Tech Issue</b></Link></li>
                        <li className="link-item"><Link to="/tech-support" className="tech-support-link"><b>Return</b></Link></li>
                        <li className="link-item"><Link to="/cart" className="tech-support-link"><b>Order Status</b></Link></li>
                    </ul>
                </div>
                <div className="QA-container">
                    <ul className="QA-list" id="chatMessages" style={{ overflowY: 'auto' }}>
                        {chatMessages.map((message, index) => (
                            <li key={index} className={message.type === 'user' ? 'user-message' : 'robot-message'}>
                                {message.type === 'user' && <span>You: </span>}
                                {message.type === 'bot' && <img src={RobotAssistant} alt="robot" className="robot-assist-icon"/>}
                                <span>{message.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="input-group flex-nowrap input-container">
                    <input type="text" className="type-section" id="messageInput" placeholder="Type message here" autoComplete="off" autoFocus={true}/>
                        <i id="submitButton" className="bi bi-arrow-right-circle"/>
                </div>
            </div>
        </div>
    )
}