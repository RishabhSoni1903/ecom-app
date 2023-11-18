import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";
import { fetchCartAsync } from "./cartSlice";
import { fetchOrdersAsync } from "./ordersSlice";
import { showToast } from "./toastSlice";

const initialState = {
    loggedIn: false,
    status: 'idle',
    user: {},
}

function getToken({ username, password }) {
    const result = axios.post('/auth/login', { username: username, password: password })
        .then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    return result;
};

export const loginAsync = createAsyncThunk(
    'login/getToken',
    async (credentials, thunkAPI) => {

        const response = await getToken(credentials)
        // console.log(response)

        if (response.status === 201) {
            sessionStorage.setItem("jwtToken", response.data.access_token)
            thunkAPI.dispatch(logIn())
            thunkAPI.dispatch(fetchCartAsync())
            thunkAPI.dispatch(fetchOrdersAsync());
            thunkAPI.dispatch(showToast('Successfully logged in!'))
            return response.data;
        } else {
            thunkAPI.dispatch(showToast("Incorrect credentials!"))
            throw new Error("Incorrect Credentials")
        }
    }
)

function getUserInfo(str) {
    const result = axios.get('/auth/getProfile', { 'headers': { 'Authorization': `Bearer ${str}` } })
        .then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    return result
}

export const getUserInfoAsync = createAsyncThunk(
    'login/getUserInfo',
    async (str) => {
        const response = await getUserInfo(str);
        if (response.status === 200) {
            return response.data;
        } else {
            alert("Please login to proceed")
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logIn: (state) => {
            state.loggedIn = true;
        },
        logOut: (state) => {
            state.loggedIn = false;
        },
        setuser: (state, user) => {
            console.log('setUser called')
            state.user = user
        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.status = 'idle'
            })
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserInfoAsync.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = 'idle'
                // console.log(action);
            })
            .addCase(getUserInfoAsync.pending, (state) => {
                state.status = 'loading'
            })
    }
})

export const { logIn, logOut, setUser } = loginSlice.actions;

export const selectLogIn = (state) => state.login.loggedIn;
export const selectRole = (state) => state.login.user?.role;
export const selectUsername = (state) => state.login.user.username;
export const selectMessage = (state) => state.login.message;
export const selectStatus = (state) => state.login.status;

export default loginSlice.reducer;