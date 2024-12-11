import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ordersList: [],
}

const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      console.log(action.payload)
      state.ordersList.push(action.payload)
    },

    deleteOrder: (state) => {
      state.ordersList = []
    },
  },
})

export const { setOrders, deleteOrder } = orderSlice.actions
export default orderSlice.reducer
