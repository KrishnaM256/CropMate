import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './api/apiSlice'
import authReducer from './features/auth/authSlice.js'
import orderReducer from './features/order/orderSlice.js'
import groupReducer from './features/group/groupSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    group: groupReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

setupListeners(store.dispatch)

export default store
