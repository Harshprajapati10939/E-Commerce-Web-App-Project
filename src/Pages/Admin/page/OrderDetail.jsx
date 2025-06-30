import React, { useContext, useEffect, useState } from "react";
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { fireDB } from "../../../Firebase/FirebaseConfig";
import MyContext from "../../../Context/Data/MyContext";
import Sidebar from "../../../Components/Admin/Sidebar";
import Navbar from "../../../Components/Navbar/Navbar";

function OrderDetail() {
  const { mode } = useContext(MyContext);
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const ordersRef = collection(fireDB, "orders");
    const q = query(ordersRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(fireDB, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(fireDB, "orders", orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <div
          className={`fixed left-0 h-full bg-gray-900 text-white shadow-lg z-50 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64`}
        >
          <Sidebar />
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-4 left-4 bg-gray-900 text-white p-2 rounded-md z-50"
        >
          ☰
        </button>

        {/* Main Content */}
        <div
          className="flex-1 p-4 md:p-8 md:ml-64 w-full overflow-x-auto"
          style={{
            backgroundColor: mode === "dark" ? "rgb(46 49 48)" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6 overflow-x-auto">
            <div className="relative w-full overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <tr>
                    <th className="px-2 py-3 md:px-4">Payment Id</th>
                    <th className="px-2 py-3 md:px-4">Image</th>
                    <th className="px-2 py-3 md:px-4">Title</th>
                    <th className="px-2 py-3 md:px-4">Original Price</th>
                    <th className="px-2 py-3 md:px-4">Quantity</th>
                    <th className="px-2 py-3 md:px-4">Total Price</th>
                    <th className="px-2 py-3 md:px-4">Category</th>
                    <th className="px-2 py-3 md:px-4">Name</th>
                    <th className="px-2 py-3 md:px-4">Address</th>
                    <th className="px-2 py-3 md:px-4">Pincode</th>
                    <th className="px-2 py-3 md:px-4">Phone</th>
                    <th className="px-2 py-3 md:px-4">Email</th>
                    <th className="px-2 py-3 md:px-4">Date</th>
                    <th className="px-2 py-3 md:px-4">Payment Status</th>
                    <th className="px-2 py-3 md:px-4">Status</th>
                    <th className="px-2 py-3 md:px-4">Update</th>
                    <th className="px-2 py-3 md:px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((allorder) =>
                    allorder.cartItems.map((item, itemIndex) => {
                      const quantity = item.quantity || 1;
                      const price = item.price || 0;
                      const totalPrice = price * quantity;
                      return (
                        <tr
                          key={`${allorder.id}-${itemIndex}`}
                          className="border-b dark:border-gray-700 text-xs md:text-sm"
                        >
                          <td className="px-2 py-2 md:px-4">{allorder.paymentId}</td>
                          <td className="px-2 py-2 md:px-4">
                            <img
                              className="w-10 h-10 md:w-16 md:h-16 object-cover rounded-lg shadow-md"
                              src={item.imageUrl}
                              alt="product"
                            />
                          </td>
                          <td className="px-2 py-2 md:px-4 font-semibold line-clamp-3">
                            {item.title}
                          </td>
                          <td className="px-2 py-2 md:px-4">₹{Number(price).toFixed(2)}</td>
                          <td className="px-2 py-2 md:px-4">{quantity}</td>
                          <td className="px-2 py-2 md:px-4 font-bold text-green-600">
                            ₹{Number(totalPrice).toFixed(2)}
                          </td>
                          <td className="px-2 py-2 md:px-4">{item.category}</td>
                          <td className="px-2 py-2 md:px-4">{allorder.addressInfo.firstName}</td>
                          <td className="px-2 py-2 md:px-4">{allorder.addressInfo.address}</td>
                          <td className="px-2 py-2 md:px-4">{allorder.addressInfo.zip}</td>
                          <td className="px-2 py-2 md:px-4">{allorder.addressInfo.phone}</td>
                          <td className="px-2 py-2 md:px-4">{allorder.email}</td>
                          <td className="px-2 py-2 md:px-4">
                            {new Date(allorder.date).toLocaleDateString()}
                          </td>
                          <td className="px-2 py-2 md:px-4">{allorder.paymentStatus}</td>
                          <td className="px-2 py-2 md:px-4">
                            <span
                              className={`px-2 py-1 text-xs md:text-sm font-semibold rounded-full ${
                                allorder.status === "Pending"
                                  ? "bg-orange-500 text-white"
                                  : allorder.status === "Processing"
                                  ? "bg-blue-500 text-white"
                                  : allorder.status === "Shipped"
                                  ? "bg-yellow-400 text-black"
                                  : allorder.status === "Delivered"
                                  ? "bg-green-500 text-white"
                                  : allorder.status === "Cancelled"
                                  ? "bg-red-600 text-white"
                                  : ""
                              }`}
                            >
                              {allorder.status}
                            </span>
                          </td>
                          <td className="px-2 py-2 md:px-4">
                            <select
                              className="p-1 md:p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                              value={allorder.status}
                              onChange={(e) =>
                                updateOrderStatus(allorder.id, e.target.value)
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-2 py-2 md:px-4">
                            {allorder.status === "Cancelled" && (
                              <button
                                onClick={() => deleteOrder(allorder.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs md:text-sm"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
