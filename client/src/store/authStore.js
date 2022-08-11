import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    userData: null,
    isLoad: true
    
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
        }),
        loadUser: (state) => ({
          ...state,
           isLoad: false 
        }),
    }
});

export const authStoreActions = authSlice.actions;

export default authSlice.reducer;