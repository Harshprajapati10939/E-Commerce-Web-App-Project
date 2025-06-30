import React, { useContext, useEffect, useState, useMemo } from 'react';
import Layout from '../../Components/Layout/Layout';
// import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, updateCartItem } from '../../Redux/cartSlice';
import { toast } from 'react-toastify';
// import { addDoc, collection } from 'firebase/firestore';
import myContext from '../../Context/Data/MyContext';
// import { fireDB } from '../../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const SHIPPING_COST = 50;
  const navigate = useNavigate();

  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + parseInt(item.price) * item.quantity, 0);
  }, [cartItems]);

  const grandTotal = SHIPPING_COST + totalAmount;

  const updateQuantity = (item, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ ...item, quantity }));
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    cartItems.forEach((item) => dispatch(deleteFromCart(item)));
    toast.success('Cart cleared');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 text">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 ">Sr. No.</th>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Unit Price</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">
                      <img src={item.imageUrl} alt={item.title} className="w-16 h-16 mx-auto" />
                    </td>
                    <td className="border p-2">{item.title}</td>
                    <td className="border p-2 text-center">₹{item.price}</td>
                    <td className=" p-6 flex justify-center items-center space-x-3">
                      <button onClick={() => updateQuantity(item, item.quantity - 1)} className="px-2 py-1 ">-</button>
                   <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item, item.quantity + 1)} className="px-2 py-1 ">+</button>
                    </td>
                    <td className="border p-2 text-center">₹{item.price * item.quantity}</td>
                    <td className="border p-2 text-center ">
                      <button onClick={() => deleteCart(item)} className="text-red-500">🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
            <div className="flex gap-230"> 
            
            <button onClick={() => navigate('/allproducts')} className="mt-6 bg-red-500 text-white px-7 py-2 hover:bg-red-600 self-start">
            Continue Shoping
            </button>
            <button onClick={clearCart} className="mt-6 bg-red-500 text-white px-9 py-2 hover:bg-red-600 self-end">Clear Cart</button>
            </div>
            
            
          </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 p-4 border  shadow">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>₹{SHIPPING_COST}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>₹{grandTotal}</span>
            </div>
            <div className="flex justify-end"> 
            <button onClick={() => navigate('/checkout')} className="mt-6 bg-blue-500 text-white px-7 py-2 hover:bg-blue-600 self-end">
            Checkout
            </button>
            </div >
            {/* <Checkout/> */}
            {/* <Modal {...{ name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow }} /> */}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
