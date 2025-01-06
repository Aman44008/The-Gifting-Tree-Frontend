import { createSlice } from '@reduxjs/toolkit'

// Load user state from localStorage and check expiration
const loadUserState = () => {
  try {
    const serializedUser = localStorage.getItem('user')
    const expirationTime = localStorage.getItem('userExpiration')
    
    if (serializedUser === null || !expirationTime) {
      return {
        isAuthenticated: false,
        user: null,
      }
    }

    // Check if 24 hours have passed
    if (Date.now() > parseInt(expirationTime)) {
      localStorage.removeItem('user')
      localStorage.removeItem('userExpiration')
      return {
        isAuthenticated: false,
        user: null,
      }
    }

    return JSON.parse(serializedUser)
  } catch (err) {
    return {
      isAuthenticated: false,
      user: null,
    }
  }
}

const initialState = loadUserState()

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(state))
      // Set expiration to 24 hours from now
      localStorage.setItem('userExpiration', Date.now() + (24 * 60 * 60 * 1000))
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('userExpiration')
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
