import React, { useContext, useState } from 'react'
import myContext from '../../../Context/Data/MyContext';
import Sidebar from '../../../Components/Admin/Sidebar';
import Navbar from '../../../Components/Navbar/Navbar';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateproduct } = context
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
                    className="md:hidden fixed top-4 left-4 bg-gray-900 text-white p-2 rounded-md z-50"
                >
                    ☰
                </button>

                {/* Main Content */}
                <div className="flex-1 p-6 md:ml-64" >
                <h1 className='text-center text-gray-900 text-2xl font-bold mb-6 uppercase'>Update Product</h1>
                    
                        <div className="flex  min-h-screen w-full">
                            <div className= "bg-white shadow-lg p-8 rounded-xl w-full max-w border-gray-300" >
                                <div className='space-y-4'>
                                <div  className="block text-gray-700 font-medium">
                                    <input type="text"
                                        onChange={(e) => setProducts({ ...products, title: e.target.value })} value={products.title}
                                        name='title'
                                        className=' w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500'
                                        placeholder='Product title'
                                    />
                                </div >
                                <div>
                                    <input type="text"
                                        name='price'
                                        onChange={(e) => setProducts({ ...products, price: e.target.value })} value={products.price}
                                        className=' w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500'
                                        placeholder='Product price'
                                    />
                                </div>
                                <div>
                                    <input type="text"
                                        name='imageurl'
                                        onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })} value={products.imageUrl}
                                        className=' w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500'
                                        placeholder='Product imageUrl'
                                    />
                                </div>
                                <div>
                                    <input type="text"
                                        name='category'
                                        onChange={(e) => setProducts({ ...products, category: e.target.value })} value={products.category}
                                        className=' w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500'
                                        placeholder='Product category'
                                    />
                                </div>
                                <div>
                                    <textarea cols="30" rows="10" name='title'
                                        className=' w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500'
                                        placeholder='Product Description'>

                                    </textarea>
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <button
                                        onClick={updateproduct}
                                        className=' bg-pink-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-200 shadow-md'>
                                        Update Product
                                    </button>
                                </div>
                                </div>

                            </div>
                        </div>
                    
                </div>
            </div>
        </>

    )
}

export default UpdateProduct