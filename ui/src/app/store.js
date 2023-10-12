import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import productsReducer from '../features/productsSlice';
import loginReducer from '../features/loginSlice';
import cartReducer from '../features/cartSlice'
import ordersReducer from '../features/ordersSlice'
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productsReducer,
        login: loginReducer,
        cart: cartReducer,
        orders: ordersReducer
    },
}, applyMiddleware(thunk))