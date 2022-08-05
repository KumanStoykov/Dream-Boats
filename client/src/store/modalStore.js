import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = {
    isOpen: false,
    type: '',
    model: '',
    message: ''
  
};

const modalSlice = createSlice({
    name: 'modalStore',
    initialState: modalInitialState,
    reducers: {
        open: (state, action) => ({
            ...state,
            isOpen: true,
            type: action.payload.type,
            model:action.payload.model,
            message: action.payload.message
            
        }),
        close: (state) => ({
            ...state,
            isOpen: false,
            type: '',
            model: '',
            message: ''
        })
    }
});

export const modalStoreActions = modalSlice.actions;

export default modalSlice.reducer;