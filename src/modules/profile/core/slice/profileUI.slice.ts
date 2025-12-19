import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ProfileUIState = {
    isLoading: boolean;
    error: string | null;
    isEditing: boolean;
    hasUnsavedChanges: boolean;
    updateSuccess: boolean;
};

const initialState: ProfileUIState = {
    isLoading: false,
    error: null,
    isEditing: false,
    hasUnsavedChanges: false,
    updateSuccess: false,
};

export const profileUISlice = createSlice({
    name: "profileUI",
    initialState,
    reducers: {
        loadProfileStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loadProfileSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        loadProfileFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateProfileStart: (state) => {
            state.isLoading = true;
            state.error = null;
            state.updateSuccess = false;
        },
        updateProfileSuccess: (state) => {
            state.isLoading = false;
            state.updateSuccess = true;
            state.isEditing = false;
            state.hasUnsavedChanges = false;
            state.error = null;
        },
        updateProfileFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },
        startEditing: (state) => {
            state.isEditing = true;
            state.updateSuccess = false;
        },
        cancelEditing: (state) => {
            state.isEditing = false;
            state.hasUnsavedChanges = false;
        },
        markAsChanged: (state) => {
            state.hasUnsavedChanges = true;
        },
        resetProfileUI: (state) => {
            state.isLoading = false;
            state.error = null;
            state.isEditing = false;
            state.hasUnsavedChanges = false;
            state.updateSuccess = false;
        },
    },
});

export const {
    loadProfileStart,
    loadProfileSuccess,
    loadProfileFailure,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFailure,
    startEditing,
    cancelEditing,
    markAsChanged,
    resetProfileUI,
} = profileUISlice.actions;
export const profileUIReducer = profileUISlice.reducer;
