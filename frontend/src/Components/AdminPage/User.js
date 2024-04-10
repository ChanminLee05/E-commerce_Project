import React, {useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import bcrypt from "bcryptjs";

const User = ({user_id, username, password, email, phone_number, roles, created}) => {
    const [isAccordionOpened, setIsAccordionOpened] = useState(false);

    const [formData, setFormData] = useState({
        user_id: '',
        username: '',
        password: '',
        email: '',
        phone_number: ''
    });

    const toggleAccordions = () => {
        setIsAccordionOpened(!isAccordionOpened);
    };

    // const comparePasswords = async (password, hashedPassword) => {
    //     try {
    //         const match = await bcrypt.compare(password, hashedPassword);
    //         return match;
    //     } catch (error) {
    //         console.error('Error comparing passwords:', error);
    //         return false;
    //     }
    // };

    function userChange(e) {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`);
        setFormData(prevState => ({
            ...prevState,
            [name]: value
            }));
    }

    function updateUser(e) {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        fetch(`http://localhost:8080/nexusHub/admin/update/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" // Set the content type to JSON
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (response.ok) {
                    console.log('User updated Successfully');
                    setFormData({
                        userId: '',
                        username: '',
                        password: '',
                        email: '',
                        phone_number: ''
                    });
                    response.json().then(data => {
                        toast.success('User updated Successfully', {
                            position: "top-center",
                            draggable: true,
                            hideProgressBar: true
                        });

                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)
                    })
                } else {
                    console.error('Failed to update user');
                    toast.warn('Failed to update user', {
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

        function deleteUser(e) {
            e.preventDefault();

            if (window.confirm("Are you sure you want to delete this user?")) {
                fetch(`http://localhost:8080/nexusHub/admin/delete/${user_id}`, {
                    method: "DELETE"
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log('User deleted Successfully');

                            toast.success('User deleted Successfully', {
                                position: "top-center",
                                draggable: true,
                                hideProgressBar: true
                            });

                            setTimeout(() => {
                                window.location.reload();
                            }, 2000)

                        } else {
                            console.error('Failed to delete user');
                            toast.warn('Failed to delete user', {
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
        }

    return (
        <>
            <tr>
                <td className="tr-col">{user_id}</td>
                <td className="tr-col">{username}</td>
                <td className="tr-col">{password}</td>
                <td className="tr-col">{email}</td>
                <td className="tr-col">{phone_number}</td>
                <td className="tr-col">{roles}</td>
                <td className="tr-col">{created}</td>
                <td className="tr-col"><button className="btn btn-primary" onClick={toggleAccordions}>UPDATE</button></td>
                <td className="tr-col"><button className="btn btn-danger" onClick={deleteUser}>DELETE</button></td>
            </tr>
            {isAccordionOpened && (
                <tr>
                    <td colSpan="7">
                        <form className="add-product-form" onSubmit={updateUser}>
                            <h1>UPDATE USERS</h1>
                            <label>
                                <h4>USER NAME</h4>
                            </label>
                            <div className="input-group mb-3 input-box">
                                <input type="text" className="form-control" name="username"  value={formData.username} onChange={userChange} required={true}></input>
                            </div>
                            <label>
                                <h4>USER PASSWORD</h4>
                            </label>
                            <div className="input-group mb-3 input-box">
                                <div className="input-group mb-3 input-box">
                                    <input type="text" className="form-control" name="password"  value={formData.password} onChange={userChange} required={true}></input>
                                </div>
                            </div>
                            <label>
                                <h4 className="">EMAIL</h4>
                            </label>
                            <div className="input-group mb-3 input-box">
                                <input type="text" className="form-control" name="email" value={formData.email} onChange={userChange} required={true}></input>
                            </div>
                            <label>
                                <h4 className="">PHONE NUMBER</h4>
                            </label>
                            <div className="input-group mb-3 input-box">
                                <input type="text" className="form-control" name="phone_number" value={formData.phone_number} onChange={userChange} required={true}></input>
                            </div>
                            <button type="submit" className="btn btn-primary">Save User</button>
                        </form>
                    </td>
                </tr>
            )}
            <ToastContainer />
        </>
    );
};

export default User;