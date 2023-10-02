import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../axios'

const initialState = {
    cart: [],
}

function fetchCart() {
    let AuthStr = sessionStorage.getItem("jwtToken")

    if (AuthStr) {

        const result = axios.get('/cart', { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
            .then((response) => {
                return response
            }).then((error) => {
                return error
            })

        return result;
    }
}

export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCart',
    async () => {
        const response = await fetchCart();
        // console.log(response)
        if (response.status === 200) {
            // console.log('fetched cart')
            return response.data
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: () => {
            console.log("setCart called")
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCartAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.cart = action.payload
            })
    }
})

export const { setCart } = cartSlice.actions;

export const selectCart = (state) => state.cart

export default cartSlice.reducer;