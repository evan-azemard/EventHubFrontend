import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
    email: string;
    name: string;
    firstName?: string;
    lastName?: string;
};

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, updateUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
