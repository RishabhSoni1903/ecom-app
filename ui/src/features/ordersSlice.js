import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../axios'

const initialState = {
    orders: [],
    status: 'idle'
}

function fetchOrders() {
    let AuthStr = sessionStorage.getItem("jwtToken")
    // console.log(AuthStr)

    if (AuthStr) {

        const result = axios.get('/order', { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
            .then((response) => {
                return response
            }).then((error) => {
                return error
            })

        return result;
    }
}

export const fetchOrdersAsync = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await fetchOrders();
        // console.log(response)
        if (response.status === 200) {
            // console.log('fetched order', response.data)
            return response.data
        }
    }
)

function placeOrder() {
    let AuthStr = sessionStorage.getItem("jwtToken")
    console.log(AuthStr)

    if (AuthStr) {

        const result = axios.post('/order', { 'headers': { 'Authorization': `${AuthStr}` } })
            .then((response) => {
                return response
            }).then((error) => {
                return error
            })

        return result;
    }
}

export const placeOrderAsync = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await placeOrder();
        // console.log(response)
        if (response.status === 200) {
            console.log('order placed', response.data)
            return response.data
        }
    }
)

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: () => {
            console.log('Set orders called')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
                if (action.payload[0].items) {
                    action.payload[0].items = JSON.parse(action.payload[0].items)
                    // console.log('items', action.payload[0].items)
                    state.orders = action.payload
                }
            })
    }

})

export const { setOrders } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;

export default ordersSlice.reducer;