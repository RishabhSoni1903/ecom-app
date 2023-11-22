import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../axios';
import { showToast } from "./toastSlice";

const initialState = {
    products: [],
    product: {},
    category: "",
    productsByCategory: [],
    searchedProducts: [],
    status: 'idle',
}

function fetchProduct(id) {
    const result = axios.get(`/product/${id}`)
        .then((response) => {
            return response
        }).then((error) => {
            return error
        });
    return result
}

export const fetchProductAsync = createAsyncThunk(
    'products/fetchProduct',
    async (id) => {
        const response = await fetchProduct(id)
        // console.log(response.data)
        return response.data;
    }
)

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

function addProduct(payload) {
    const AuthStr = sessionStorage.getItem('jwtToken')

    if (AuthStr) {
        const result = axios.post('/product', payload, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
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
    async (payload, thunkAPI) => {
        try {
            const response = await addProduct(payload);
            console.log(response);
            thunkAPI.dispatch(showToast("Product added successfully!"))
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(showToast('Product not added! Check the data entered in the fields are valid.'))
            throw new Error("Product not created")
        }

    }
)

function deleteProduct(id) {
    const AuthStr = sessionStorage.getItem('jwtToken')
    if (AuthStr) {
        const result = axios.delete(`/product/${id}`, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
            .then((response) => {
                return response;
            }).then((error) => {
                return error;
            })
        return result;
    } else {
        alert("No Authorization")
    }
}

export const deleteProductAsync = createAsyncThunk(
    'product/deleteProduct',
    async (id) => {
        const response = await deleteProduct(id);
        // if(response.status === )
        return response.data
    }
)

function filterByCategory(category) {
    const result = axios.get(`/category/${category}`)
        .then((response) => {
            return response
        }).then((error) => {
            return error
        });
    return result
}

export const filterByCategoryAsync = createAsyncThunk(
    'product/filterByCategory',
    async (category, thunkAPI) => {
        try {
            const response = await filterByCategory(category);
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showToast("Products of this category doesn't exists!"))
            throw new Error("Not Found!")
        }
    }
)

function searchProduct(keyword) {
    const result = axios.get(`/search/${keyword}`)
        .then((response) => {
            return response
        }).then((error) => {
            return error
        })
    return result;
}

export const searchProductAsync = createAsyncThunk(
    'product/searchProduct',
    async (keyword, thunkAPI) => {
        try {
            const response = await searchProduct(keyword)
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showToast("Not Found!"))
            throw new Error("Not Found!")
        }
    }
)

function buyNow(productId) {
    const AuthStr = sessionStorage.getItem('jwtToken')
    console.log("product Id", productId)
    const result = axios.post('/order/buynow', productId, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
        .then((response) => {
            return response;
        }).then((error) => {
            return error;
        })
    return result;
}

export const buyNowAsync = createAsyncThunk(
    'product/buyNow',
    async (productId, thunkAPI) => {
        try {
            const response = await buyNow(productId)
            console.log(response.data)
            thunkAPI.dispatch(showToast("Product bought"))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showToast("Cannot place order"))
            throw new Error("Cannot place order")
        }
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addAllProduct: () => {
            // console.log("All products added successfully")
        },
        setCategory: (state, action) => {
            state.category = action.payload
        }
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
            })
            .addCase(fetchProductAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchProductAsync.fulfilled, (state, action) => {
                state.product = action.payload;
                state.status = 'idle';
            })
            .addCase(filterByCategoryAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.productsByCategory = action.payload;
            })
            .addCase(searchProductAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.searchedProducts = action.payload
            })
            .addCase(searchProductAsync.rejected, (state, action) => {
                console.log(action.payload)
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                console.log(action.meta.arg)
                const elementToRemove = state.products.filter((item) => item.id == action.meta.arg)
                console.log("Element to be removed", elementToRemove)
                console.log("action.payload", action.payload)
                state.products = state.products.filter((item) => item !== elementToRemove)
            })

    }
})

export const selectAllProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.product;
export const selectProductByCategory = (state) => state.products.productsByCategory;
export const selectSearchedProducts = (state) => state.products.searchedProducts;

export const { addAllProduct, setCategory } = productsSlice.actions;

export default productsSlice.reducer