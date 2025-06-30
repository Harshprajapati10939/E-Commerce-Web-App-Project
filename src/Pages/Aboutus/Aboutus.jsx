import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import myContext from "../../Context/Data/MyContext";
import Layout from "../../Components/Layout/Layout";

function Aboutus() {
    const context = useContext(myContext);
    const { mode } = context;

    return (
        <>
           <Layout>
                <section className="text-gray-600 body-font mb-10 px-4">
                    <h1 className="text-center text-3xl font-bold text-black title-font mb-2 pt-6"
                        style={{ color: mode === "dark" ? "white" : "" }}>
                        About us
                    </h1>
                    <div className="h-1 w-24 bg-pink-600 rounded mx-auto"></div>

                    <div className="max-w-[1320px] mx-auto py-5 flex flex-wrap md:flex-nowrap items-center">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd63vU5UJwYTQ-cigvZ1NDAnPW1e5eKniaL-a44jhHVhQJGlG20qM-wqc&s"
                                alt="About Us"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="w-full md:w-1/2 px-5 mt-6 md:mt-0"
                            style={{ color: mode === "dark" ? "white" : "" }}>
                            <h1 className="text-3xl md:text-4xl">W elcome to E-bharat Website</h1>
                            <p className="py-3">
                                At E-bharat website, we believe in delivering quality products at the best prices. Our mission is to provide a seamless shopping experience with a wide range of products, from fashion and electronics to home essentials and more.
                            </p>

                            <h1 className="text-3xl md:text-4xl">Who We Are</h1>
                            <p className="py-3">
                                We are a passionate team dedicated to bringing you the latest trends and high-quality products. Whether you're looking for stylish apparel, cutting-edge gadgets, or everyday essentials, we have something for everyone.
                            </p>

                            <h1 className="text-3xl md:text-4xl">Why Choose Us?</h1>
                            <p className="py-3">
                              
                                ✅ <strong>Affordable Prices</strong> – Get the best deals without compromising on quality. <br />
                                ✅ <strong>Secure Shopping</strong> – Your privacy and security are our top priorities. <br />
                                ✅ <strong>Fast & Reliable Delivery</strong> – Enjoy quick and hassle-free shipping straight to your doorstep. <br />
                                ✅ <strong>24/7 Customer Support</strong> – Our team is always here to assist you with any queries.
                            </p>

                           
                        </div>
                    </div>
                </section>
                </Layout>
            
        </>
    );
}

export default Aboutus;
