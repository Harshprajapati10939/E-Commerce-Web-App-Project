import React, { useContext } from 'react';
import myContext from '../../../Context/Data/MyContext';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import Sidebar from '../../../Components/Admin/Sidebar';
import Navbar from '../../../Components/Navbar/Navbar';
// import Header from '../../../Components/Admin/Header';


function ProductDetail() {
    const context = useContext(myContext);
    const { mode, product, edithandle, deleteProduct } = context;
    
    return (
        <>
        <Navbar/>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="w-64 fixed top-25 left-0 h-full bg-gray-800 text-white">
                    <Sidebar />
                </div>

                
                {/* Main Content */}
                <div className="flex-1 flex flex-col ml-64 bg-gray-100 dark:bg-gray-900 pb-20" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                    {/* <Header /> */}
                    <div className="flex-1 overflow-auto">
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden" >
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-gray-500 dark:text-gray-400" >
                                    <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                                        <tr>
                                            <th className="px-6 py-3">S.No</th>
                                            <th className="px-6 py-3">Image</th>
                                            <th className="px-6 py-3">Title</th>
                                            <th className="px-6 py-3">Price</th>
                                            <th className="px-6 py-3">Category</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.map((item, index) => (
                                            <tr key={index} className="border-b dark:border-gray-700">
                                                <td className="px-6 py-4">{index + 1}.</td>
                                                <td className="px-6 py-4">
                                                    <img className='w-16 rounded' src={item.imageUrl} alt="img" />
                                                </td>
                                                <td className="px-6 py-4">{item.title}</td>
                                                <td className="px-6 py-4">₹{item.price}</td>
                                                <td className="px-6 py-4">{item.category}</td>
                                                <td className="px-6 py-4">{item.date}</td>
                                                <td className="px-6 py-4 flex gap-3">
                                                    <button onClick={() => deleteProduct(item)} className="text-red-500 hover:text-red-700">🗑️</button>
                                                    <Link to={'/updateproduct'} onClick={() => edithandle(item)}>
                                                        <button className="text-blue-500 hover:text-blue-700">✏️</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6 mb-10">
                            <Link to={'/addproduct'}>
                                <button className="text-white bg-pink-600 hover:bg-pink-700 px-5 py-2.5 rounded-lg flex items-center gap-2">
                                    Add Product <FaCartPlus size={20} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
