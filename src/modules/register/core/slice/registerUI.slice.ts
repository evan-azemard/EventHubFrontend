import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type RegisterUIState = {
    isLoading: boolean;
    error: string | null;
    success: boolean;
};

const initialState: RegisterUIState = {
    isLoading: false,
    error: null,
    success: false,
};

export const registerUISlice = createSlice({
    name: "registerUI",
    initialState,
    reducers: {
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        registerSuccess: (state) => {
            state.isLoading = false;
            state.success = true;
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        resetRegisterUI: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = false;
        },
    },
});

export const { registerStart, registerSuccess, registerFailure, resetRegisterUI } = registerUISlice.actions;
export const registerUIReducer = registerUISlice.reducer;
