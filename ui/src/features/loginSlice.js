import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";
import { fetchCartAsync } from "./cartSlice";

const initialState = {
    loggedIn: false,
    status: 'idle',
    user: {},
}

function getToken({ username, password }) {
    const result = axios.post('/auth/login', { username: username, password: password })
        .then((response) => {
            return response
        }).then((error) => {
            return error
        })
    return result;
};

export const loginAsync = createAsyncThunk(
    'login/getToken',
    async (credentials, thunkAPI) => {
        const response = await getToken(credentials);
        // console.log(response)

        if (response.status === 201) {
            // console.log('logged in')
            sessionStorage.setItem("jwtToken", response.data.access_token)
            thunkAPI.dispatch(logIn())
            thunkAPI.dispatch(fetchCartAsync())
        } else {
            alert("Credentials are wrong")
        }
        return response.data
    }
)

function getUserInfo(str) {
    const result = axios.get('/auth/getProfile', { 'headers': { 'Authorization': `Bearer ${str}` } })
        .then((response) => {
            return response
        }).then((error) => {
            return error
        })
    return result
}

export const getUserInfoAsync = createAsyncThunk(
    'login/getUserInfo',
    async (str) => {
        const response = await getUserInfo(str);
        if (response.status === 200) {
            // console.log(response);
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
        },
        
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                // console.log(action.payload)
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