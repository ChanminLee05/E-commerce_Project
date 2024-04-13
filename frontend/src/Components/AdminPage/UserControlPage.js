import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import MainPageSideBar from "./MainPageSideBar";
import User from "./User";

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
        <div className="admin-page">
            <MainPageSideBar/>
            <div className="form-control admin-form">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col" className="th-col">#</th>
                        <th scope="col" className="th-col">User Name</th>
                        <th scope="col" className="th-col">Password</th>
                        <th scope="col" className="th-col">Email</th>
                        <th scope="col" className="th-col">Phone Number</th>
                        <th scope="col" className="th-col">Role</th>
                        <th scope="col" className="th-col">Created</th>
                        <th scope="col" className="th-col">Update</th>
                        <th scope="col" className="th-col">Action</th>
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
    );
};

export default UserControlPage;