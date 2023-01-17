import cartSlice from '@/modules/Cart/redux/cartSlice'
import HomeSlice from '@/modules/Home/redux/HomeSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    home: HomeSlice.reducer,
    cart: cartSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})