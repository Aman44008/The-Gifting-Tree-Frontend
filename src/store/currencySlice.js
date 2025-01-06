import { createSlice } from '@reduxjs/toolkit'

const savedCountry = localStorage.getItem('selectedCountry')

const initialState = {
  selectedCountry: savedCountry ? JSON.parse(savedCountry) : { code: 'IN', name: 'India', currency: 'INR', symbol: '₹' },
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload
      localStorage.setItem('selectedCountry', JSON.stringify(action.payload))
    },
  },
})

export const { setSelectedCountry } = currencySlice.actions
export default currencySlice.reducer