import { createSlice } from '@reduxjs/toolkit'

// Load cart state from localStorage
const loadCartState = () => {
  try {
    const serializedCart = localStorage.getItem('cart')
    if (serializedCart === null) {
      return {
        items: [],
        total: 0,
      }
    }
    return JSON.parse(serializedCart)
  } catch (err) {
    return {
      items: [],
      total: 0,
    }
  }
}

const initialState = loadCartState()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1
      } else {
        state.items.push(action.payload)
      }
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      localStorage.setItem('cart', JSON.stringify(state))
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity
        state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      localStorage.setItem('cart', JSON.stringify(state))
    }
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
