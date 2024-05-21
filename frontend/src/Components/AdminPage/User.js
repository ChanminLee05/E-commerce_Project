import React, {useState} from 'react';
import bcrypt from "bcryptjs";
import "./User.css";

const User = ({user_id, username, password, email, phone_number, roles, created}) => {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        user_id: '',
        username: '',
        password: '',
        email: '',
        phone_number: ''
    });

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

        const updateConfirmMessage = window.confirm("Are you sure you want to update this user?");
        if (updateConfirmMessage) {
            fetch(`https://nexushub-backend-a8e67f946270.herokuapp.com/nexusHub/admin/update/${user_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" // Set the content type to JSON
                },
                body: JSON.stringify(formData)
            })
                .then((response) => {
                    if (response.ok) {
                        window.alert('Product updated Successfully');

                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)

                    } else {
                        window.alert('Failed to update product');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

        function deleteUser(e) {
            e.preventDefault();

            const deleteConfirmMessage = window.confirm("Are you sure you want to delete this user?");
            if (deleteConfirmMessage) {
                fetch(`https://nexushub-backend-a8e67f946270.herokuapp.com/nexusHub/admin/delete/${user_id}`, {
                    method: "DELETE"
                })
                    .then((response) => {
                        if (response.ok) {
                            window.alert('User deleted Successfully');

                            setTimeout(() => {
                                window.location.reload();
                            }, 2000)

                        } else {
                            window.alert('Failed to delete user');
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setFormData({
            user_id,
            username,
            password,
            email,
            phone_number
        });
    };

    return (
        <tr>
            <td className="tr-col user-info-txt">{user_id}</td>
            <td className="tr-col user-info-txt">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={userChange}
                    />
                ) : (
                    username
                )}
            </td>
            <td className="tr-col user-info-txt user-password">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={userChange}
                    />
                ) : (
                    password
                )}
            </td>
            <td className="tr-col user-info-txt">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={userChange}
                    />
                ) : (
                    email
                )}
            </td>
            <td className="tr-col user-info-txt">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="password"
                        value={formData.phone_number}
                        onChange={userChange}
                    />
                ) : (
                    phone_number
                )}
            </td>
            <td className="tr-col user-info-txt">{roles}</td>
            <td className="tr-col user-info-txt">{created}</td>
            <td className="tr-col user-info-txt">
                {isEditing ? (
                    <button className="btn btn-primary update-btn" onClick={updateUser}>UPDATE</button>
                ) : (
                    <button className="btn btn-primary update-btn" onClick={toggleEditMode}>EDIT</button>
                )}
            </td>
            <td className="tr-col user-info-txt"><button className="btn btn-danger product-delete-btn" onClick={deleteUser}>DELETE</button></td>
        </tr>
    );
};

export default User;