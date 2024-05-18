import React, {useEffect, useRef, useState} from 'react';
import "./AdminMainPage.css";
import MainPageSideBar from "./MainPageSideBar";
import Chart from 'chart.js/auto';

function AdminMainPage() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const chartRef = useRef(null);

    const randomWeeklySales = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
    const formattedSalesNumber = randomWeeklySales.toLocaleString();

    const monthlySalesData = Array.from({ length: 12 }, () => (Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000) * 30);

    useEffect(() => {
        const fetchTotalData = async () => {
            try {
                const totalProductNumber = await fetch('http://localhost:8080/nexusHub/product/totalProducts');
                if (totalProductNumber.ok) {
                    const productsData = await totalProductNumber.json();
                    setTotalProducts(productsData);
                } else {
                    console.error('Failed to fetch total products');
                }

                const totalUserNumber = await fetch('http://localhost:8080/nexusHub/user/totalUsers');
                if (totalUserNumber.ok) {
                    const usersData = await totalUserNumber.json();
                    setTotalUsers(usersData);
                } else {
                    console.error('Failed to fetch total users');
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching total data:', error);
            }
        };

        fetchTotalData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            // Create chart graph
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Monthly Sales Report',
                        data: monthlySalesData,
                        backgroundColor: [
                            'rgb(250,46,88)',
                            'rgb(34,155,236)',
                        ],
                        borderColor: [
                            'rgb(250,46,88)',
                            'rgb(34,155,236)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Monthly Sales Report',
                            font: {
                                size: 30
                            }
                        }

                    }
                }
            });
        }
    }, [isLoading, monthlySalesData]);

    return (
        <div className="admin-main-page">
            <MainPageSideBar/>
            <div className="admin-dashboard">
                <div className="admin-top-section">
                    <h4 className="text-md-center top-title">NEXUSHUB</h4>
                    <h1>ADMIN DASHBOARD</h1>
                </div>
                <div className="admin-mid-section">
                    <div className="product-section product-user-section">
                        <div className="product-section-left left">
                            <h4 className="product-user-title">Total Product</h4>
                            {isLoading ? <p>Loading...</p> : <h2 className="product-user-text">{totalProducts}</h2>}
                        </div>
                        <div className="product-section-right right">
                            <i className="bi bi-layers-fill product-user-icon"></i>
                        </div>
                    </div>
                    <div className="user-section product-user-section">
                        <div className="user-section-left left">
                            <h4 className="product-user-title">Total User</h4>
                            {isLoading ? <p>Loading...</p> : <h2 className="product-user-text">{totalUsers}</h2>}
                        </div>
                        <div className="user-section-right right">
                            <i className="bi bi-person-fill-gear product-user-icon"></i>
                        </div>
                    </div>
                    <div className="sales-section product-user-section">
                        <div className="sales-section-left left">
                            <h4 className="product-user-title">Weekly Sales</h4>
                            <h2 className="product-user-text">${formattedSalesNumber}</h2>
                        </div>
                        <div className="user-section-right right">
                            <i className="bi bi-bar-chart-line-fill product-user-icon"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-bottom-section">
                    <canvas ref={chartRef} className="chart"></canvas>
                </div>
            </div>
        </div>
    );
}

export default AdminMainPage;