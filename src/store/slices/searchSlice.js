import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  searchResults: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      const {query, results} = action.payload;
      state.searchQuery = query;
      state.searchResults = results;
    },
    clearSearch: state => {
      state.searchQuery = '';
      state.searchResults = [];
    },
  },
});

export const {addSearch, clearSearch} = searchSlice.actions;

export default searchSlice.reducer;
