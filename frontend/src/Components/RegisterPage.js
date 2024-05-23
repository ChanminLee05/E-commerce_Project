import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "./RegisterPage.css";

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    function handleSignUp(e) {
        e.preventDefault();

        // Check if any required field is empty
        if (username === '' || password === '' || email === '' || phone_number === '') {
            toast.warn('Please fill out all fields', {
                position: "top-center",
                draggable: true,
                hideProgressBar: true
            });
            return;
        }

        // Check if username or email contains empty space
        if (username.trim() !== username || email.trim() !== email || /\s/.test(username) || /\s/.test(email)) {
            toast.warn('No spaces allowed in username or email', {
                position: "top-center",
                draggable: true,
                hideProgressBar: true
            });
            return;
        }

        // Check if phone_number follows the specified format
        if (!/^\d{3}-\d{3}-\d{4}$/.test(phone_number)) {
            toast.warn('Phone number should be in format 123-456-7890', {
                position: "top-center",
                draggable: true,
                hideProgressBar: true
            });
            return;
        }

        const registerUser = {username, password, email, phone_number};
        console.log(registerUser);
        fetch("https://nexushub-backend-a8e67f946270.herokuapp.com/nexusHub/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(registerUser)
        }).then((response) => {
            if (response.ok) {
                console.log('Register Successful');
                toast.success('Register Successful', {
                    position: "top-center",
                    draggable: true,
                    hideProgressBar: true
                });
                setUsername('');
                setPassword('');
                setEmail('');
                setPhoneNumber('');
            } else {
                console.error('Register Failed');
                if (response.status === 400) {
                    toast.warn('Username or Email or Phone number already exists', {
                        position: "top-center",
                        draggable: true,
                        hideProgressBar: true
                    });
                } else {
                    toast.error('Registration failed, please try again later', {
                        position: "top-center",
                        draggable: true,
                        hideProgressBar: true
                    });
                }
            }
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Something went wrong, please try again later', {
                position: "top-center",
                draggable: true,
                hideProgressBar: true
            });
        });
    }



    return (
        <div className="register">
            <form className="register-form">
                <h1 className="register-title">Signup</h1>
                <div className="register-info-container">
                    <label>
                        <p className="m-1 text-uppercase label-txt fw-semibold text-body-secondary">User Name:</p>
                        <input className="username label-input" type="text" name="uname" placeholder="User name" required={true} autoFocus={true}
                               value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        <p className="m-1 text-uppercase label-txt fw-semibold text-body-secondary">Password:</p>
                        <input className="password label-input" type="password" name="password" placeholder="Password" required={true}
                               value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <label>
                        <p className="m-1 text-uppercase label-txt fw-semibold text-body-secondary">Email Address:</p>
                        <input className="email label-input" type="email" name="email" placeholder="Email" required={true}
                               value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <p className="m-1 text-uppercase label-txt fw-semibold text-body-secondary">Phone Number:</p>
                        <input className="phone label-input" type="tel" name="phone" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required={true}
                               value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </label>
                </div>
                <input className="btn btn-primary text-uppercase register-btn" type="submit" value="Join Us" onClick={handleSignUp}/>
                <div className="register-footer">
                    <span className="footer-txt">Already have an account?</span><Link to="/main" className="footer-link">Login</Link>
                </div>
            </form>

            <ToastContainer />
        </div>
    );
};

export default RegisterPage;