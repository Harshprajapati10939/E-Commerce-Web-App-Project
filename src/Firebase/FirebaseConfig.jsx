// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBkxfX4ZqLRG_tog7ft6pDtQqgbP8YaiU",
  authDomain: "e-commerce-site-a05ee.firebaseapp.com",
  projectId: "e-commerce-site-a05ee",
  storageBucket: "e-commerce-site-a05ee.appspot.com",  // ✅ Fixed this line
  messagingSenderId: "890151143633",
  appId: "1:890151143633:web:3aece31693fede07da1df0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app); // ✅ Fixed incorrect import
const storage= getStorage(app);
export { fireDB, auth, storage };
