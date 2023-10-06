import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../axios';

const initialState = {
    products: [],
    status: 'idle',
}

function fetchAllProduct() {
    const result = axios.get('/product')
        .then((response) => {
            return response
        }).then((error) => {
            return error
        });
    return result
}

export const fetchAllProductAsync = createAsyncThunk(
    'products/getProducts',
    async () => {
        const response = await fetchAllProduct();
        // console.log(response.data)
        return response.data;
    }
)

function addProduct(data) {
    const AuthStr = sessionStorage.getItem('jwtToken')

    if (AuthStr) {
        const result = axios.post('/product', data, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
            .then((response) => {
                return response;
            }).then((error) => {
                return error;
            })
        return result;
    }
}

export const addProductAsync = createAsyncThunk(
    'products/addProduct',
    async (data) => {
        const response = await addProduct(data);
        console.log(response);
        return response.data;
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addAllProduct: () => {
            // console.log("All products added successfully")
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
                if (state.products.length === 0) {
                    state.products = action.payload
                }
                state.status = "idle";
                // console.log("fetch products fulfilled", action.payload)
            }
            )
    }
})

export const selectAllProducts = (state) => state.products.products;

export const { addAllProduct } = productsSlice.actions;

export default productsSlice.reducer