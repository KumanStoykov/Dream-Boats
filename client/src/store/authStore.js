import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    userData: null,
    watchedBoats: [],
    
};

const authSlice = createSlice({
    name: 'authStore',
    initialState: userInitialState,
    reducers: {

        login: (state, action) => ({
            ...state,
            userData: action.payload.userData
        }),

        logout: () => userInitialState,

        addedWatchedBoatsToLocalStorage: (state, action) => ({
           ...state,
           watchedBoats: action.payload.watchedBoats
        }),
        removeWatchedBoatsFromLocaleStorage: (state, action) => {
            const boatIndex = state.watchedBoats.indexOf(action.payload._id);
            const currentBoats = state.watchedBoats.splice(boatIndex, 1);  
            return {
                ...state,
                watchedBoats: currentBoats
            };          
        },
    }
});

export const authStoreActions = authSlice.actions;

export default authSlice.reducer;