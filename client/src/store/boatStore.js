import { createSlice } from '@reduxjs/toolkit';

const boatInitialState = {
    boat: null,
    boats: []
};

const boatSlice = createSlice({
    name: 'boatStore',
    initialState: boatInitialState,
    reducers: {
        addBoat: (state, action) => ({
            ...state,
            boat: action.payload.boat
        }),
        addBoats: (state, action) => ({
            ...state,
           boats: action.payload.boats
        }),
        removeBoat: (state) => ({
            ...state,
            boat: null
        }),
        removeBoats: (state) => ({
            ...state,
            boats: null
        }),
    }
});

export const boatStoreActions = boatSlice.actions;

export default boatSlice.reducer;