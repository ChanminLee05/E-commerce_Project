import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import MainPageSideBar from "./MainPageSideBar";
import User from "./User";
import "./UserControlPage.css";

const UserControlPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch("http://localhost:8080/nexusHub/admin/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(userData => {
            console.log("Fetched users:", userData);


            setUsers(userData);
        })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to fetch users.');
            });
    };

    return (
        <>
            <MainPageSideBar/>
            <div className="admin-user-page">
                <div className="form-control admin-form">
                    <table className="table table-striped table-hover user-control-table">
                        <thead>
                        <tr>
                            <th scope="col" className="th-col col-1">#</th>
                            <th scope="col" className="th-col col-2">User Name</th>
                            <th scope="col" className="th-col col-1">Password</th>
                            <th scope="col" className="th-col col-1">Email</th>
                            <th scope="col" className="th-col col-3">Phone Number</th>
                            <th scope="col" className="th-col col-1">Role</th>
                            <th scope="col" className="th-col col-2">Created</th>
                            <th scope="col" className="th-col col-1">Update</th>
                            <th scope="col" className="th-col col-1">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <User
                                key={index}
                                user_id={user.user_id}
                                username={user.username}
                                password={user.password}
                                email={user.email}
                                phone_number={user.phone_number}
                                roles={user.roles.join(', ')}
                                created={user.created}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserControlPage;