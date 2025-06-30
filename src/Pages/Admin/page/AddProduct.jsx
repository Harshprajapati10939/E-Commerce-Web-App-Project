import React, { useContext, useState } from 'react';
import myContext from '../../../Context/Data/MyContext';
import Sidebar from '../../../Components/Admin/Sidebar';
import Navbar from '../../../Components/Navbar/Navbar';

function AddProduct() {
    const context = useContext(myContext);
    const { mode,products, setProducts, addProduct } = context;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [price,setPrice] = useState()
    const [discount,setDiscount] = useState()
    const [discountedPrice,setDiscountedPrice] = useState()
    function handleDiscount(e){
        setDiscount(e.target.value)
        setDiscountedPrice(price-(price*(e.target.value/100)))
    }
    return (
        <>
          <Navbar/>
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar - Responsive */}
                <div className={`fixed left-0 h-full bg-gray-900 text-white shadow-lg z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
                    <Sidebar />
                </div>

                {/* Sidebar Toggle for Mobile */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden fixed top-18 left-0 bg-gray-900 text-white p-2 rounded-md z-50"
                >
                    ☰
                </button>

                {/* Main Content */}
                <div className="flex-1 p-6 md:ml-64" >
                    <h1 className="text-center text-gray-900 text-2xl font-bold mb-6 uppercase">
                        Add Product
                    </h1>
                    
                    <div className="flex  min-h-screen w-full">
                        <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w border-gray-300" >
                            {/* Input Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium">Product Title</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setProducts({ ...products, title: e.target.value })}
                                        value={products.title}
                                        name="title"
                                        className="w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter product title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium">Product Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        onChange={(e) => setProducts({ ...products, price: e.target.value })}
                                        value={products.price}
                                        className="w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter product price"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium">Image URL</label>
                                    <input
                                        type="text"
                                        name="imageurl"
                                        onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                                        value={products.imageUrl}
                                        className="w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter image URL"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        onChange={(e) => setProducts({ ...products, category: e.target.value })}
                                        value={products.category}
                                        className="w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter product category"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium">Description</label>
                                    <textarea
                                        cols="30"
                                        rows="4"
                                        name="description"
                                        onChange={(e) => setProducts({ ...products, description: e.target.value })}
                                        className="w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter product description"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Add Product Button */}
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={addProduct}
                                    className="bg-pink-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-200 shadow-md"
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProduct;
