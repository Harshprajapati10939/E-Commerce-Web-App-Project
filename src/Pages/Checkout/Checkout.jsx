import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../Firebase/FirebaseConfig';
import Layout from '../../Components/Layout/Layout';
import { success } from '../../utils/messages';
import { useNavigate } from 'react-router-dom';


function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const SHIPPING_COST = 50;
  const navigate = useNavigate();

  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + parseInt(item.price) * item.quantity, 0);
  }, [cartItems]);

  const grandTotal = SHIPPING_COST + totalAmount;

  const [fnm, setFnm] = useState('');
  const [lnm, setLnm] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!fnm || !lnm || !address || !city || !state || !zip || !email || !phone) {
      return toast.error('All fields are required', { position: 'top-center', autoClose: 1000 });
    }

    const orderInfo = {
      cartItems,
      addressInfo: {
        firstName: fnm,
        lastName: lnm,
        address,
        city,
        state,
        zip,
        email,
        phone,
      },
      email: JSON.parse(localStorage.getItem('user'))?.user?.email || '',
      userid: JSON.parse(localStorage.getItem('user'))?.user?.uid || '',
      date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Not Paid' : 'Paid',
      paymentId: paymentMethod === 'COD' ? 'COD' : 'razorpay_payment_id',
      status: 'pending',
    };

    if (paymentMethod === 'COD') {
      await addDoc(collection(fireDB, 'orders'), orderInfo);
      success('Thank you for your order!');
      setTimeout(() => navigate('/order'), 5000);
      
    } else {
      handlePayment(orderInfo);
    }
  };

  const handlePayment = async (orderInfo) => {
    try {
      const options = {
        key: 'rzp_test_Atp3EfPU8FRLGr',
        amount: grandTotal * 100,
        currency: 'INR',
        name: 'E-Bharat',
        description: 'Order Payment',
        handler: async (response) => {
          toast.success('Payment Successful');
          setTimeout(() => navigate('/order'), 5000);
          orderInfo.paymentStatus = 'Paid';
          orderInfo.paymentId = response.razorpay_payment_id;
          await addDoc(collection(fireDB, 'orders'), orderInfo);
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('Payment Failed!');
    }
  };

  return (
    <Layout>
      <section className="checkout-area py-12">
        <div className="container mx-auto px-4">
          <form onSubmit={handleOrder} className="space-y-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Billing Details */}
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-6">Billing Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="block mb-1 font-medium">First Name</label>
                      <input
                        type="text"
                        className="form-control w-full border border-gray-300 p-2 rounded"
                        value={fnm}
                        onChange={(e) => setFnm(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="block mb-1 font-medium">Last Name</label>
                      <input
                        type="text"
                        className="form-control w-full border border-gray-300 p-2 rounded"
                        value={lnm}
                        onChange={(e) => setLnm(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-span-2">
                      <label className="block mb-1 font-medium">Address</label>
                      <input
                        type="text"
                        className="form-control w-full border border-gray-300 p-2 rounded"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="block mb-1 font-medium">City</label>
                      <input
                        type="text"
                        className="form-control w-full border border-gray-300 p-2 rounded"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="block mb-1 font-medium">State</label>
                      <input
                        type="text"
                        className="form-control w-full border border-gray-300 p-2 rounded"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="block mb-1 font-medium">Zip</label>
                      <input
                        type="text"
                        className="form-control w-full border border-gray-300 p-2 rounded"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="block mb-1 font-medium">Email</label>
                      <input
                        type="email"
                        className="form-control w-full border border-gray-300 p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="block mb-1 font-medium">Phone</label>
                      <input
                        type="text"
                        className="form-control w-full border border-gray-300 p-2 rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                <label className="block mb-1 font-medium">Payment Method</label>
                <select
                  className="form-control w-full border border-gray-300 p-2 rounded"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="COD">Cash on Delivery (COD)</option>
                  <option value="Razorpay">Razorpay</option>
                </select>
              </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">Product</th>
                        <th className="px-4 py-2 text-center">Product Name</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
        {cartItems.map((item, index) => (
          <tr key={index}>
            <td className="px-4 py-3">
              <img src={item.imageUrl} alt={item.title} className="w-14 h-14 object-cover rounded" />
            </td>
            <td className="px-4 py-3">
              <p className="font-medium">{item.title}</p>
            </td>
            <td className="px-4 py-3 text-center">
              {item.quantity}
            </td>
            <td className="px-4 py-3 text-center">
              ₹{item.price}
            </td>
            <td className="px-4 py-3 text-right font-bold">
              ₹{item.price * item.quantity}
            </td>
          </tr>
        ))}
      </tbody>
                    
                  </table>
                  
                </div>
                <div className="p-6 rounded-lg shadow-md " >
                  <div className="mt-4 flex justify-between">
                    <span className="font-semibold">Subtotal:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="font-semibold">Shipping:</span>
                    <span>₹{SHIPPING_COST}</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="font-semibold">Grand Total:</span>
                    <span>₹{grandTotal}</span>
                  </div>
                  </div>
                <div className=" p-6 rounded-lg shadow-md ">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Place Order
              </button>
            </div>
                {/* </div>
                <div className=" p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <label htmlFor="cod" className="text-lg">Cash on Delivery</label>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <input
                    type="radio"
                    id="razorpay"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={paymentMethod === 'Razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <label htmlFor="razorpay" className="text-lg">Razorpay</label>
                </div>
               */}
            </div>
          </div>

            {/* Payment Section */}
           

            {/* Place Order Button */}
           
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Checkout;
