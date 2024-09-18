import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ordersList: [],
  buyerOrdersList: [],
}

const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      console.log(action.payload)
      state.ordersList = [...state.ordersList, action.payload]
    },
    setBuyerOrders: (state, action) => {
      console.log(action.payload)
      state.buyerOrdersList = [...state.buyerOrdersList, action.payload]
    },
    deleteOrder: (state) => {
      state.ordersList = []
    },
  },
})

export const { setOrders, deleteOrder, setBuyerOrders } = orderSlice.actions
export default orderSlice.reducer
