import React, { useContext, useEffect, useState } from 'react';
import { FaUserTie, FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';

import myContext from '../../../Context/Data/MyContext';

import { fireDB } from '../../../Firebase/FirebaseConfig';
import Sidebar from '../../../Components/Admin/Sidebar';
import Navbar from '../../../Components/Navbar/Navbar';
// import Footer from '../../../Components/Admin/Footer';
// import Header from '../../../Components/Admin/Header';

function Dashboard() {
    const context = useContext(myContext);
    const { mode } = context;

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
     const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const productsSnapshot = await getDocs(collection(fireDB, 'products'));
                const ordersSnapshot = await getDocs(collection(fireDB, 'orders'));
                const usersSnapshot = await getDocs(collection(fireDB, 'users'));

                setTotalProducts(productsSnapshot.size);
                setTotalOrders(ordersSnapshot.size);
                setTotalUsers(usersSnapshot.size);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <>
           <Navbar/>

            <div className="flex min-h-screen bg-gray-150 dark:bg-gray-900">
                {/* Sidebar */}
                <div className={`fixed left-0 h-full bg-gray-900 text-white shadow-lg z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
                    <Sidebar />
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden fixed top-18 left-0 bg-gray-900 text-white p-2 rounded-md z-50"
                >
                    ☰
                </button>

                {/* Main Content */}
                <div className="flex flex-col flex-1 p-4 md:ml-64"style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 48)' : '', color: mode === 'dark' ? 'white' : '', }} >
                    {/* <Header /> */}

                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {/* Total Products */}
                        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg flex items-center gap-4">
                            <FaBox className="text-purple-500 text-5xl" />
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{totalProducts}</h2>
                                <p className="text-purple-500 font-bold">Total Products</p>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg flex items-center gap-4">
                            <FaShoppingCart className="text-green-500 text-5xl" />
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{totalOrders}</h2>
                                <p className="text-green-500 font-bold">Total Orders</p>
                            </div>
                        </div>

                        {/* Total Users */}
                        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg flex items-center gap-4">
                            <FaUsers className="text-blue-500 text-5xl" />
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{totalUsers}</h2>
                                <p className="text-blue-500 font-bold">Total Users</p>
                            </div>
                        </div>
                    </div>

                
                    
                </div>
            </div>
    
        </>
    );
}

export default Dashboard;
