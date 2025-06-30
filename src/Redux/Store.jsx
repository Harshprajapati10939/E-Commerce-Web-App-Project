import { configureStore } from '@reduxjs/toolkit' 
import cartSlice from '../Redux/cartSlice'

export const store = configureStore({
  reducer: {
    cart:cartSlice,
  },
  devTools:true
})