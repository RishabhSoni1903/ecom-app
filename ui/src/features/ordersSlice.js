import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../axios'
import { showToast } from "./toastSlice";

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
    const AuthStr = sessionStorage.getItem("jwtToken")

    if (AuthStr) {
        const result = axios.post('/order', '', { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
            .then((response) => {
                return response
            }).then((error) => {
                return error
            })
        return result;
    }
}

export const placeOrderAsync = createAsyncThunk(
    'orders/placeOrders',
    async (data, thunkAPI) => {
        try {
            const response = await placeOrder();
            if (response.status === 201) {
                console.log('Order placed')
                thunkAPI.dispatch(showToast("Order placed successfully!"))
                return response.data
            } else {
                throw new Error("Failed to place order!")
            }
        } catch (error) {
            thunkAPI.dispatch(showToast("Order not placed. Try again!"))
            throw error;
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
                if (action.payload.length > 0) {
                    action.payload.forEach((i) => {
                        i.items = JSON.parse(i.items)
                    })
                }
                // console.log('Order', action.payload)
                state.orders = action.payload
            })
            .addCase(placeOrderAsync.fulfilled, (state, action) => {
                action.payload.items = JSON.parse(action.payload.items)
                console.log('Order', action.payload)
                state.orders.push(action.payload)
            })
    }

})

export const { setOrders } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;

export default ordersSlice.reducer;