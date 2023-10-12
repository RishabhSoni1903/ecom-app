import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    status: 'idle'
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: ()=>{
            console.log('Set orders called')
        }
    }

})

export const { setOrders } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;

export default ordersSlice.reducer;