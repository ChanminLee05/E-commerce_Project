import React, {useState} from 'react';
import {toast} from "react-toastify";

const User = ({userId, username, password, email, phoneNumber, created}) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const [formData, setFormData] = useState({
        userId: '',
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        created: ''
    });

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    function handleChange(e) {
        const { name, value, files } = e.target;
        console.log(`Changing ${name} to ${value}`);
        setFormData(prevState => ({
            ...prevState,
            [name]: value
            }));
        }
    }

    function handleUpdate(e) {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        fetch(`http://localhost:8080/nexusHub/admin/update/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" // Set the content type to JSON
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Product updated Successfully');
                    setFormData({
                        userId: '',
                        username: '',
                        password: '',
                        email: '',
                        phoneNumber: '',
                        created: ''
                    });
                    response.json().then(data => {
                        toast.success('User updated Successfully', {
                            position: "top-center",
                            draggable: true,
                            hideProgressBar: true
                        });
                        window.location.reload();
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

    return (
        <div>

        </div>
    );
};

export default User;