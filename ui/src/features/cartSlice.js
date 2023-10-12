import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../axios'

const initialState = {
    cart: [],
    status: 'idle'
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

function addToCart(body) {
    const AuthStr = sessionStorage.getItem('jwtToken')
    if(AuthStr) {
        const result = axios.post('/cart', body, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
        .then((response) => {
            return response
        }).then((error) => {
            return error
        })
        return result
    }
}

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (body) => {
        const response = await addToCart(body)
        console.log(response.data)
        if(response.status===201) {
            return response.data
        }else{
            alert("Error adding item to the cart", response.status, response.statusText)
        }
    }
)

function deleteItemInCart(id) {
    const AuthStr = sessionStorage.getItem('jwtToken')
    axios.delete(`/cart/${id}`, {'headers': {'Authorization': `Bearer ${AuthStr}`}})
            .then((response)=>{
                return response
            })
            .then((error)=>{
                return error;
            })
}

export const deleteItemInCartAsync = createAsyncThunk(
    'cart/deleteItemInCart',
    async(id) => {
        const response = await deleteItemInCart(id);
        if(response.status === 200) {
            console.log(response)
            return this.state.cart.filter((item)=> item.id !== id)
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (newState) => {
            this.cart = newState;
            console.log("setCart called")
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchCartAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchCartAsync.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.status = 'idle'
            state.cart = action.payload
        })
        .addCase(deleteItemInCartAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            console.log(action)
        })
        .addCase(deleteItemInCartAsync.rejected, ()=>{
            console.log('Deletion from failed')
        })
    }
})

export const { setCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart

export default cartSlice.reducer;