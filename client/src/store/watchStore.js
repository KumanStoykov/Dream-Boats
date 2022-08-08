import { createSlice } from '@reduxjs/toolkit';

const watchListInitialState = {
    watchList: [],

};

const watchSlice = createSlice({
    name: 'watchStore',
    initialState: watchListInitialState,
    reducers: {
        addWatched: (state, action) => {
            console.log(state.watchList)

            const isWatched = state.watchList.find(x => x?._id === action.payload.boat._id);

            if (!isWatched) {
                state.watchList.push(action.payload.boat);
            }
            return state;
        },
        removeWatched: (state, action) => ({
            ...state,
            watchList: state.watchList.filter(x => x._id !== action.payload.boat._id)
        }),
    }
});

export const watchStoreActions = watchSlice.actions;

export default watchSlice.reducer;