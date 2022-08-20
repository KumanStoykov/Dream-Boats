import { createSlice } from '@reduxjs/toolkit';

const appInitialState = {
    appIsLoad: true

};

const appSlice = createSlice({
    name: 'appInitialStore',
    initialState: appInitialState,
    reducers: {

        setAppIsLoad: (state) => ({
            ...state,
            appIsLoad: false
        }),
    }
});

export const appInitialStoreActions = appSlice.actions;

export default appSlice.reducer;