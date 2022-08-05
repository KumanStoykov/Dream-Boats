import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    userData: null,
    watched: [],
    
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

        addWatched: (state, action) => {   
            const isWatched = state.watched.find(x => x?._id === action.payload.boat._id);
            
            if(!isWatched) {
                state.watched.push(action.payload.boat);
            }
            return state;
        },
        removeWatched: (state, action) => ({
            ...state,
            watched: state.watched.filter(x => x._id !== action.payload.boat._id)
        }),
    }
});

export const authStoreActions = authSlice.actions;

export default authSlice.reducer;