import React, { useContext, useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import MyContext from "../../Context/Data/MyContext";
import { collection, query, where, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import logoImage from "/lightable/images/ebharat.png"; // Your logo path
const Order = () => {
  const { mode, loading } = useContext(MyContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.user?.uid;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        const q = query(collection(fireDB, "orders"), where("userid", "==", userId));
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, [userId]);

  // const formatDate = (date) => {
  //   if (!date) return "N/A";
  //   const d = new Date(date);
  //   return isNaN(d) ? "Invalid Date" : d.toDateString();
  // };

  // const estimatedDeliveryDate = (date) => {
  //   if (!date) return "N/A";
  //   const d = new Date(date);
  //   d.setDate(d.getDate() + 7);
  //   return d.toDateString();
  // };







const handleDownloadReceipt = (order) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // === Company Logo & Header ===
  doc.addImage(logoImage, "PNG", 15, y, 30, 30);
  // doc.setFont("helvetica", "bold");
  // doc.setFontSize(22);
  // doc.text("E-Bharat", 50, y + 10);
  // doc.setFont("helvetica", "normal");
  // doc.setFontSize(10);
  // doc.text("Delivering India Digitally", 50, y + 18);

  doc.setFontSize(12);
  doc.text(`Invoice #: ${order.id}`, pageWidth - 80, y + 5);
  doc.text(`Created: ${formatDate(order.date)}`, pageWidth - 80, y + 12);
  doc.text(`Due: ${estimatedDeliveryDate(order.date)}`, pageWidth - 80, y + 19);

  y += 40;

  // === From Company ===
  doc.setFont("helvetica", "bold");
  doc.text("From:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.text("E-Bharat, Inc.", 15, y + 7);
  doc.text("GSTIN: 27AAGCV8898B1Z3", 15, y + 14);
  doc.text("Mumbai, Maharashtra", 15, y + 21);
  doc.text("Andheri West, 400058", 15, y + 28);

  // === To Customer ===
  doc.setFont("helvetica", "bold");
  doc.text("To:", pageWidth - 80, y);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${order.addressInfo.firstName}${order.addressInfo.lastName} `, pageWidth - 80, y + 7);
  doc.text(`Address: ${order.addressInfo.address}`, pageWidth - 80, y + 14);
  doc.text(`Pincode: ${order.addressInfo.zip}`, pageWidth - 80, y + 21);
  doc.text(`Phone: ${order.addressInfo.phone}`, pageWidth - 80, y + 28);
  doc.text(`Email: ${order.addressInfo.email}`, pageWidth - 80, y + 35);
  doc.text(`PaymentMethod: ${order.paymentMethod}`, pageWidth - 80, y + 42);
  doc.text(`PaymentStatus: ${order.paymentStatus}`, pageWidth - 80, y + 49);

  y += 60;

  // === Order Items Table ===
  const tableData = order.cartItems?.map((item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    const total = price * quantity;
  
    return [
      item.title,
      quantity.toString(),
      price.toFixed(2),
      total.toFixed(2)
    ];
  });
  

  autoTable(doc, {
    startY: y,
    head: [["Item", "Qty", "Price", "Total"]],
    body: tableData,
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 4,
      lineColor: [200, 200, 200],
      lineWidth: 1,
    },
    headStyles: {
      fillColor: [0, 102, 204],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { halign: "right", cellWidth: 30 },
      2: { halign: "right", cellWidth: 30 },
      3: { halign: "right", cellWidth: 30 },
    },
    theme: "striped",
  });

  let finalY = doc.lastAutoTable.finalY + 10;

  // === Subtotal / Total (No Tax) ===
  const subtotal = order.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // autoTable(doc, {
  //   startY: finalY,
  //   body: [["Total", `${subtotal.toFixed(2)}`]],
  //   // styles: {
  //   //   font: "helvetica",
  //   //   fontSize: 10,
  //   // },
  //   columnStyles: {
  //     0: { cellWidth: 50 },
  //     1: { halign: "right", cellWidth: 50 },
  //   },
  //   margin: { left: pageWidth - 70 },
  //   theme: "plain",
  // });

  // finalY = doc.lastAutoTable.finalY + 5;

  // === Grand Total Display ===
  // doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(0, 102, 0);
  doc.text(`Total: ${subtotal.toFixed(2)}`, pageWidth - 50, finalY + 2);

  // === Footer ===
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Thank you for shopping with E-Bharat!", 15, finalY + 30);
  doc.text("This is a computer-generated invoice. No signature required.", 15, finalY + 37);

  // === Save PDF ===
  doc.save(`Order_${order.id}.pdf`);
};


// Helper Functions
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-IN", options);
};

const estimatedDeliveryDate = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 3);
  return formatDate(date.toISOString());
};


  

  const handleCancelOrder = async (id) => {
    try {
      await updateDoc(doc(fireDB, "orders", id), { status: "Cancelled" });
      setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status: "Cancelled" } : order)));
      toast.success("Order Cancelled Successfully");
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "orders", id));
      setOrders((prev) => prev.filter((order) => order.id !== id));
      toast.success("Order Deleted Successfully");
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

  if (loading || isLoading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="flex h-screen overflow-hidden overflow-y-auto">
        <div className="w-64 fixed left-0 h-screen z-10">
          <Sidebar />
        </div>

        <div className={`ml-64 w-full  p-5 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
          <h2 className="text-2xl font-semibold mb-5 text-center">My Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`rounded-xl shadow-lg p-4 border h-auto ${mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
              >
                <div className="mb-2">
                  <strong>Order ID:</strong> {order.id}
                </div>
                <div className="mb-2">
                  <strong>Status:</strong> {order.status}
                </div>
                <div className="mb-4 flex gap-2 ">
                  {order.cartItems.map((item, index) => (
                    <div key={index}>
                      <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-md" />
                      <div className={`text-sm font-medium ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
                        {item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}
                      </div>
                      <div className="text-gray-500 text-sm font-medium" >Qty: {item.quantity}</div>
                      <div className="text-gray-500 text-xs font-medium">₹{item.price}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadReceipt(order)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Download PDF
                  </button>
                  {order.status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 text-sm"
                    >
                      Cancel
                    </button>
                  )}
                  {order.status === "Cancelled" && (
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
