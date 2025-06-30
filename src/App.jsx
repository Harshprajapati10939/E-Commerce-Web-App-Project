import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Order from './Pages/Order/Order'
import Cart from './Pages/Cart/Cart'
import DashBoard from './Pages/Admin/Dashboard/DashBoard'
import NoPage from './Pages/NOpage/NoPage'
import MyState from './Context/Data/MyState'
import Login from './Pages/Registration/Login'
import Signup from './Pages/Registration/Signup'
import ProductInfo from './Pages/ProductInfo/ProductInfo'
import AddProduct from './Pages/Admin/page/AddProduct'
import UpdateProduct from './Pages/Admin/page/UpdateProduct'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './Pages/AllProducts/AllProduct'
import Aboutus from './Pages/Aboutus/Aboutus'
import OrderDetail from './Pages/Admin/page/OrderDetail'
import ProductDetail from './Pages/Admin/page/ProductDetail'
import Checkout from './Pages/Checkout/Checkout'
import UserDetail from './Pages/Admin/page/UserDetail'

import Profile from './Pages/Profile/Profile'

// import ProfilePage from './Pages/Profilepage/ProfilePage'
function App() {


  return (
    <>
      <MyState>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/allproducts'element={<Allproducts /> }/>
            <Route path='/about us'element={<Aboutus /> }/>
            <Route path='//checkout'element={<Checkout /> }/>
            <Route path='/order' element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />
            
            <Route path='/myprofile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          
            
            <Route path='/cart' element={<Cart />} />
            <Route path='/dashboard' element={
              <ProtectedRouteForAdmin>
                <DashBoard />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addproduct" element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            } />
             <Route path="/orderdetail" element={
              <ProtectedRouteForAdmin>
                <OrderDetail />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/productdetail" element={
              <ProtectedRouteForAdmin>
                <ProductDetail/>
              </ProtectedRouteForAdmin>
            } />
            <Route path="/updateproduct" element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/userdetail" element={
              <ProtectedRouteForAdmin>
                <UserDetail />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            
            <Route path='/*' element={<NoPage />} />

          </Routes>
          <ToastContainer/>
        </Router>
      </MyState>
    </>
  )
}

export default App

//user 

export const ProtectedRoute = ({children}) =>{
  const user = localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to ={'/login'}/>
  }
}

//admin
const ProtectedRouteForAdmin = ({children}) =>{

  const admin = JSON.parse(localStorage.getItem('user'))

  if(admin.user.email === 'harshprajapati23@gmail.com'){
    return children
  }else{
    return <Navigate to ={'/login'}/>
  }
}