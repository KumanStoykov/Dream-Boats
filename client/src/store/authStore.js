import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    userData: null,
};

const authSlice = createSlice({
    name: 'authStore',
    initialState: userInitialState,
    reducers: {

        login: (state, action) => ({
            ...state,
            userData: action.payload.userData
        }),

        logout: (state) => ({
            ...state,
            userData: null
        })
    }
});

export const authStoreActions = authSlice.actions;

export default authSlice.reducer;