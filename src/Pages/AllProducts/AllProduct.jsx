import React, { useContext, useEffect, useState } from 'react'

import ProductCard from '../../Components/ProductCard/ProductCard'


import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../Redux/cartSlice'
import Filter from '../../Components/Filter/Filter'
import myContext from '../../Context/Data/MyContext'
import Layout from '../../Components/Layout/Layout'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

function Allproducts() {
    const context = useContext(myContext)
    const { mode, product, searchKey, filterType, filterPrice } = context
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.user?.uid || null;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart);
    console.log(cartItems)

    const addCart = (product) => {
        if (!userId) {
            setIsLoading(false);
            // toast.success('first login in your account ');
            window.location.href = "/login"
            
        } else {
            dispatch(addToCart(product));
            toast.success('add to cart');
        }


    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Layout>
            <Filter />
            <section className="text-gray-600 body-font">
                <div className="container mx-auto px-5 py-8 md:py-16">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                        <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900"
                            style={{ color: mode === 'dark' ? 'white' : '' }}>
                            Our Latest Collection
                        </h1>
                        <div className="h-1 w-24 bg-pink-600 rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {product
                            .filter((obj) => obj.title.toLowerCase().includes(searchKey))
                            .filter((obj) => obj.category.toLowerCase().includes(filterType))
                            .filter((obj) => obj.price.includes(filterPrice))

                            .map((item, index) => {
                                const { title, price, description, imageUrl, id } = item;
                                return (
                                    <div key={index} className="group cursor-pointer rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between h-[350px] w-[250px] mx-auto"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                        onClick={() => window.location.href = `/productinfo/${id}`}>

                                        <div className="relative overflow-hidden h-[60%]">
                                            <img className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300" src={imageUrl} alt="product" />
                                            <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                New
                                            </div>
                                        </div>

                                        <div className="p-3 flex flex-col justify-between h-[40%]">
                                            <h2 className="text-xs text-gray-500 uppercase font-semibold tracking-wide"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>E-Bharat</h2>
                                            <h1 className="text-sm font-bold text-gray-900 truncate"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h1>
                                            <p className="text-xs text-gray-600 truncate"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>{description}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-md font-semibold text-pink-600">₹ {price}</p>
                                                <button onClick={(e) => { e.stopPropagation(); addCart(item); }}
                                                    className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-medium py-1 px-2 rounded-md transition duration-300">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>


        </Layout>
    )
}

export default Allproducts