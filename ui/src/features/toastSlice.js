import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    show: false,
    message: "This is a toast message"
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        hideToast: (state) => {
            state.show = false;
        },
        showToast: (state, action) => {
            state.show = true
            state.message = action.payload;
        }
    }
})

export const { hideToast, showToast } = toastSlice.actions;

export const selectShow = (state) => state.toast.show;
export const selectMessage = (state) => state.toast.message;

export default toastSlice.reducer;