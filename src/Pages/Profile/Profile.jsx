import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";
import { toast } from "react-toastify";
import MyContext from "../../Context/Data/MyContext";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import { FaMoneyBill, FaShoppingBag } from "react-icons/fa";

const Profile = () => {
  const { mode } = useContext(MyContext);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.user?.uid;

  const [formData, setFormData] = useState({
    name: storedUser?.user?.displayName || "",
    email: storedUser?.user?.email || "",
    birthdate: "",
    mobile: "",
    address: "",
    profileImage: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
      const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        // Check for existing document with this user's email
        const usersRef = collection(fireDB, "users");
        const q = query(usersRef, where("email", "==", formData.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setFormData((prev) => ({ ...prev, ...docData }));
          setIsEditing(false); // Show view-only if data exists
        } else {
          setIsEditing(true); // No data, ask for input
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usersRef = collection(fireDB, "users");
      const q = query(usersRef, where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Update existing
        const existingDoc = querySnapshot.docs[0];
        await updateDoc(doc(fireDB, "users", existingDoc.id), formData);
        toast.success("Profile updated successfully");
      } else {
        // Create new
        await setDoc(doc(fireDB, "users", userId), formData);
        toast.success("Profile saved successfully");
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to save profile");
    }
  };

  const handleUpdateClick = () => setIsEditing(true);

  if (isLoading) return <div className="text-center p-10">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="flex h-screen ">
       <div className="w-64 fixed left-0 h-screen z-10">
                 <Sidebar />
               </div>
        <div
          className={` ml-64 p-6 w-full h-screen ${
            mode === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>

          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg p-8">
            {!isEditing ? (
              <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                {/* Info */}
                <div className="space-y-4 w-full md:w-2/3">
                  <div>
                    <span className="font-semibold">Name:</span> {formData.name}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {formData.email}
                  </div>
                  <div>
                    <span className="font-semibold">Birthdate:</span>{" "}
                    {formData.birthdate}
                  </div>
                  <div>
                    <span className="font-semibold">Mobile:</span>{" "}
                    {formData.mobile}
                  </div>
                  <div>
                    <span className="font-semibold">Address:</span>{" "}
                    {formData.address}
                  </div>
                  <div className="text-center">
                  <button
                    onClick={handleUpdateClick}
                    className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700"
                  >
                    Update Profile
                  </button>
                  </div>
                </div>
                
                {/* Profile Image */}
                <div className="flex justify-center items-center">
                  {formData.profileImage && (
                    <img
                      src={formData.profileImage}
                      alt="Profile"flex 
                      className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
                    />
                  )}
                </div>
              </div>
              
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row justify-center items-center gap-10"
              >
                {/* Info Form */}
                <div className="space-y-4 w-full md:w-2/3">
                <div className="flex flex-col items-center gap-4">
                  {formData.profileImage && (
                    <img
                      src={formData.profileImage}
                      alt="Preview"
                      className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                  <div>
                    <label className="block font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      // onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Birthdate</label>
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                  >
                    Save Profile
                  </button>
                  </div>
                </div>

                {/* Profile Image Upload */}
                
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
