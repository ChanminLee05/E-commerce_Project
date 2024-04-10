import React, {useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    function handleSignIn(e) {
        e.preventDefault();
        const user = {username, password}
        console.log(user);
        fetch("http://localhost:8080/nexusHub/admin/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then((response) => {
            if (response.ok) {
                console.log('Login Successful');
                response.json().then(data => {
                    localStorage.setItem('token', data.token);
                    setIsLoggedIn(true);
                    navigate('/admin/product-control');
                    toast.success('Login Successful', {
                        position: "top-center",
                        draggable: true,
                        hideProgressBar: true
                    });
                })

                // Schedule token removal after 1 hour
                setTimeout(() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    toast.warn('Session Expired. Please login again.', {
                        position: "top-center",
                        draggable: true,
                        hideProgressBar: true
                    });
                }, 60000 * 60);

                setPassword('');
            } else {
                console.error('Login Failed');
                toast.warn('Username or Password is incorrect', {
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

    function handleLogOut() {
        // Clear token from localStorage upon logout
        localStorage.removeItem('token');

        setIsLoggedIn(false);
        toast.success("Logout Successful", {
                position: "top-center",
                draggable: true,
                hideProgressBar: true
            }
        )
    }

    return (
        <div>
            <form>
                <div>
                    <div className="mb-3">
                        <label htmlFor="exampleDropdownFormUsername" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="exampleDropdownFormUsername" placeholder="User Name"
                               value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password"
                               value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <Link to="/find" className="find-link"><p className="find-txt">Forgot your username or password?</p></Link>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSignIn}>Sign in</button>
                    <Link to="/register" className="register-link"><button className="btn btn-primary">Sign Up</button></Link>

                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AdminLoginPage;