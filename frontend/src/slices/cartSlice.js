import { createSlice } from '@reduxjs/toolkit'
import { updatePrices } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      // Check if the item is already in the cart
      const existItem = state.cartItems.find(
        (currentItem) => currentItem._id === item._id
      )

      if (existItem) {
        // If exists, update quantity
        state.cartItems = state.cartItems.map((currentItem) =>
          currentItem._id === existItem._id ? item : currentItem
        )
      } else {
        // If not exist, add new item to cartItems
        state.cartItems = [...state.cartItems, item]
      }

      // Update the prices and save to storage
      return updatePrices(state)
    },
    removeFromCart: (state, action) => {
      // Filter out the item to remove from the cart
      state.cartItems = state.cartItems.filter(
        (deleteItem) => deleteItem._id !== action.payload
      )

      // Update the prices and save to storage
      return updatePrices(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      return updatePrices(state)
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      return updatePrices(state)
    },
  },
})

export default cartSlice.reducer
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions
