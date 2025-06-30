import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cart')) || [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },

    deleteFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },

    updateCartItem: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    },
  },
});

export const { addToCart, deleteFromCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
