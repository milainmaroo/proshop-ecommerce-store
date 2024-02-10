import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import cartSliceReducer from './slices/cartSlice'
import loginSlice from './slices/loginSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    login: loginSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
