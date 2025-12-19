import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type LoginUIState = {
    isLoading: boolean;
    error: string | null;
};

const initialState: LoginUIState = {
    isLoading: false,
    error: null,
};

export const loginUISlice = createSlice({
    name: "loginUI",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetLoginUI: (state) => {
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, resetLoginUI } = loginUISlice.actions;
export const loginUIReducer = loginUISlice.reducer;
