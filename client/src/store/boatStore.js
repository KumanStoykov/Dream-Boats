import { createSlice } from '@reduxjs/toolkit';

const boatInitialState = {
    _id: null,
    category: '',
    model: '',
    price: null,
    description: '',
    year: null,
    fuel: '',
    location: '',
    image: {
        url: '',
        object_id: ''
    },
    owner: null
};

const boatSlice = createSlice({
    name: 'boatStore',
    initialState: boatInitialState,
    reducers: {
        addBoat: (state, action) => ({
            ...state,
            _id: action.payload._id,
            category: action.payload.category,
            model: action.payload.model,
            price: action.payload.price,
            description: action.payload.description,
            year: action.payload.year,
            fuel: action.payload.fuel,
            location: action.payload.location,
            image: action.payload.image,
            owner: action.payload.owner
        }),
        removeBoat: () => boatInitialState,
    }
});

export const boatStoreActions = boatSlice.actions;

export default boatSlice.reducer;