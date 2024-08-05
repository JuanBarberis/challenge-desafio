import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: []
};

export const searchFavorites = createSlice({
    name: 'search',
    initialState,
    reducers: {
        removeSearch: (state, action) => {
            state.search = state.search.filter(item => item.nombre !== action.payload)
        },
        addFilter: (state, action) => {
            state.search.push(action.payload)
        },
    },
});

export const { removeSearch, addFilter } = searchFavorites.actions;
export default searchFavorites.reducer;