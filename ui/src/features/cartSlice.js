import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../axios'
import { showToast } from "./toastSlice";

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
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Failed to fetch cart')
        }
    }
)

function addToCart(body) {
    const AuthStr = sessionStorage.getItem('jwtToken')
    if (AuthStr) {
        console.log('body', body)
        const result = axios.post('/cart', body, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
            .then((response) => {
                console.log('result', response)
                return response
            }).then((error) => {
                return error
            })
        return result
    }
}

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (body, thunkAPI) => {
        const response = await addToCart(body)
        // console.log(response.data)
        if (response.status === 201) {
            thunkAPI.dispatch(showToast("Added to cart!"))
            return response.data
        } else {
            alert("Error adding item to the cart", response.status, response.statusText)
        }
    }
)

function deleteItemInCart(id) {
    const AuthStr = sessionStorage.getItem('jwtToken')
    const result = axios.delete(`/cart/${id}`, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
        .then((response) => {
            console.log('Delete api called', response)
            return response
        })
        .then((error) => {
            return error;
        })
    return result;
}

export const deleteItemInCartAsync = createAsyncThunk(
    'cart/deleteItemInCart',
    async (id, thunkAPI) => {
        const response = await deleteItemInCart(id);
        if (response.status === 200) {
            console.log(response, "Delete API called")
            thunkAPI.dispatch(removeItemFromCart(id))
            thunkAPI.dispatch(showToast("Removed from cart!"))
            return response.data;
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: () => {
            console.log("setCart called")
        },
        removeItemFromCart: (state, id) => {
            state.cart = state.cart.filter((item) => item.id !== id);
        },
        emptyCart: (state) => {
            state.cart = [];
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
            .addCase(deleteItemInCartAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                const id = action.meta.arg;
                state.cart = state.cart.filter((item) => item.id !== id)
                // console.log('deletion successful', action)
            })
            .addCase(deleteItemInCartAsync.rejected, () => {
                console.log('Deletion failed')
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                const alreadyExistAt = state.cart.findIndex((item) => item.item.id === action.payload.item.id)
                if (alreadyExistAt === -1) {
                    state.cart.push(action.payload)
                } else {
                    state.cart[alreadyExistAt].quantity += 1
                }
            })
    }
})

export const { setCart, removeItemFromCart, emptyCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart

export default cartSlice.reducer;