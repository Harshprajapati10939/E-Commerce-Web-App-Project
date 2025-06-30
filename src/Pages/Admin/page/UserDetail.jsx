import React, { useContext, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import myContext from '../../../Context/Data/MyContext';
import Sidebar from '../../../Components/Admin/Sidebar';
import Navbar from '../../../Components/Navbar/Navbar';

function UserDetail() {
    const context = useContext(myContext);
    const { mode, users, deleteUser } = context;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className={`min-h-screen overflow-auto ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <Navbar />
            <div className="flex">
                {/* Sidebar - Responsive */}
                <div className={`fixed left-0 h-full bg-gray-900 text-white shadow-lg z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
                    <Sidebar />
                </div>
                <div className="w-full md:ml-64 p-6">
                    <h1 className="text-center mb-6 text-3xl font-semibold underline">User Details</h1>
                    <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-300 dark:border-gray-700">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="text-xs uppercase bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-900 text-black">
                                <tr>
                                    <th className="px-6 py-3 border border-gray-400 dark:border-gray-600">S.No</th>
                                    <th className="px-6 py-3 border border-gray-400 dark:border-gray-600">Name</th>
                                    <th className="px-6 py-3 border border-gray-400 dark:border-gray-600">Email</th>
                                    <th className="px-6 py-3 border border-gray-400 dark:border-gray-600">Uid</th>
                                    <th className="px-6 py-3 border border-gray-400 dark:border-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200">
                                        <td className="px-6 py-4 border border-gray-400 dark:border-gray-600 font-medium">{index + 1}.</td>
                                        <td className="px-6 py-4 border border-gray-400 dark:border-gray-600">{item.name}</td>
                                        <td className="px-6 py-4 border border-gray-400 dark:border-gray-600">{item.email}</td>
                                        <td className="px-6 py-4 border border-gray-400 dark:border-gray-600">{item.uid}</td>
                                        <td className="px-6 py-4 border border-gray-400 dark:border-gray-600 text-center">
                                            <button 
                                                onClick={() => deleteUser(item.uid)}
                                                className="text-red-500 hover:text-red-700 transition duration-200">
                                                <FaTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
