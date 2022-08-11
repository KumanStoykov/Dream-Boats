import { createSlice } from '@reduxjs/toolkit';

const commentInitialState = {
    comment: null,
    comments: [],
    formIsOpen: false,
    formIsEdit: false
};

const commentSlice = createSlice({
    name: 'commentStore',
    initialState: commentInitialState,
    reducers: {
        addComment: (state, action) => ({
            ...state,
            comment: action.payload.comment
        }),

        addComments: (state, action) => ({
            ...state,
            comments: action.payload.comments
        }),

        updateComments: (state, action) => {
            const income = action.payload.comment;
            const index = state.comments.findIndex(x => x._id === income._id);

            if (index !== -1) {
                state.comments.splice(index, 1, income);
            } else {
                state.comments.unshift(income);
            }
            return state;
        },

        removeComment: (state, action) => {
            const commentId = action.payload;

            const index = state.comments.findIndex(x => x._id === commentId);

            if (index !== -1) {
                state.comments.splice(index, 1);
            }
            return state
        },

        setForm: (state, action) => ({
            ...state,
            formIsOpen: action.payload
        }),
        setEditForm: (state, action) => ({
            ...state,
            formIsEdit: action.payload
        })
    }
});

export const commentStoreActions = commentSlice.actions;

export default commentSlice.reducer;