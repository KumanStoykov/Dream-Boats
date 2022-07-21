import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = {
    isOpen: false,
    errMessage: ''
};

const modalSlice = createSlice({
    name: 'modalStore',
    initialState: modalInitialState,
    reducers: {
        open: (state, action) => ({
           ...state,
           isOpen: true,
           errMessage: action.payload.errMessage
        }),
        close: (state) => ({
            ...state,
            isOpen: false,
            errMessage: ''
         })
    }
});

export const modalStoreActions = modalSlice.actions;

export default modalSlice.reducer;