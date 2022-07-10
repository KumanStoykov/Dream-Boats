import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    _id: null,
    firstName: '',
    lastName: '',
    email: '',
    message: [],
    watchedBoats: [],
    watchedItems: []
};

const authSlice = createSlice({
    name: 'authStore',
    initialState: userInitialState,
    reducers: {

        login: (state, action) => ({
            ...state,
            _id: action.payload._id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
        }),

        logout: () => userInitialState,

        addedWatchedBoatsToLocalStorage: (state, action) => {
            state.watchedBoats.push(action.payload._id);
            return state
        },
        removeWatchedBoatsFromLocaleStorage: (state, action) => {
            const boatIndex = state.watchedBoats.indexOf(action.payload._id);
            state.watchedBoats.splice(boatIndex, 1);  
            return state;          
        },
        addedItemWatchedItemToLocalStorage:(state, action) => {
            state.watchedItems.push(action.payload._id);
            return state;
        },
        removeWatchedItemsFromLocalStorage: (state, action) => {
            const boatIndex = state.watchedItems.indexOf(action.payload._id);
            state.watchedItems.splice(boatIndex, 1);
            return state;
        },

    }
});

export const authStoreActions = authSlice.actions;

export default authSlice.reducer;