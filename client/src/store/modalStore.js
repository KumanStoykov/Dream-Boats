import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = {
    isOpen: false,
};

const modalSlice = createSlice({
    name: 'modalStore',
    initialState: modalInitialState,
    reducers: {
        open: (state) => {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        }
    }
});

export const modalStoreActions = modalSlice.actions;

export default modalSlice.reducer;