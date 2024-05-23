import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "./ForgotPage.css";

const ForgotPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userPage, setUserPage] = useState(true);

    function changeToUser() {
        setUserPage(true);
    }
    function changeToPassword() {
        setUserPage(false);
    }

    function findUsername(e) {
        e.preventDefault();

        // Check if any required field is empty
        if (email === '') {
            toast.warn('Please fill out fields', {
                position: "top-center",
                draggable: true,
                hideProgressBar: true
            });
            return;
        }

        const findUser = {email};
        console.log(findUser);

        fetch(`https://nexushub-backend-a8e67f946270.herokuapp.com/nexusHub/user/find?email=${encodeURIComponent(email)}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                return response.text();
            })
            .then((data) => {
                console.log("Found User:", data);
                toast.success(`Your Username is ${data}`, {
                    position: "bottom-center",
                    draggable: true,
                    hideProgressBar: true
                });
                setEmail('');
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
                toast.error('Could not find user or something went wrong, please try again later', {
                    position: "bottom-center",
                    draggable: true,
                    hideProgressBar: true
                });
            });
    }

    function resetPassword(e) {
        e.preventDefault();

        if (email === '') {
            toast.warn('Please fill out the email field', {
                position: "top-center",
                draggable: true,
                hideProgressBar: true
            });
            return;
        }

        fetch(`https://nexushub-backend-a8e67f946270.herokuapp.com/nexusHub/user/reset-password?email=${encodeURIComponent(email)}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to reset password');
                }
                return response.text();
            })
            .then((data) => {
                console.log("Password reset successful");
                toast.success(`Password reset successful for ${email}. New password is sent your email address`, {
                    position: "top-center",
                    draggable: true,
                    hideProgressBar: true,
                    toastId: "custom-toast-container"
                });
                setEmail('');
            })
            .catch((error) => {
                console.error('Error resetting password:', error);
                toast.error('Could not reset password or something went wrong, please try again later', {
                    position: "bottom-center",
                    draggable: true,
                    hideProgressBar: true
                });
            });
    }

    return (
        <div className="forgot">
            <form className="forgot-form">
                <div className="forgot-container">
                    <div className="forgot-header">
                        <div className="username-container">
                            <p className="forgot-title text-uppercase fs-3 fw-semibold" onClick={changeToUser}>Username</p>
                        </div>
                        <div className="password-container">
                            <p className="forgot-title text-uppercase fs-3 fw-semibold" onClick={changeToPassword}>Password</p>
                        </div>
                    </div>
                    <div className="forgot-info-container">
                        <label>
                            <p className="m-1 text-uppercase fs-4 fw-semibold text-body-secondary">Email Address:</p>
                            <input className="email" type="email" name="email" placeholder="Email" required={true}
                                   value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                    </div>
                    {userPage ? (
                        <input className="m-5 btn btn-primary btn-lg fs-4 text-uppercase" id="findUserButton" type="submit" value="Find User" onClick={findUsername}/>
                    ) : <input className="m-5 btn btn-primary btn-lg fs-4 text-uppercase" id="resetPasswordButton" type="submit" value="Reset Password" onClick={resetPassword}/>}

                    <div className="register-footer">
                        <span className="m-3 fs-5">Already have an account?</span><Link to="/main" className="fs-5">Login</Link>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ForgotPage;