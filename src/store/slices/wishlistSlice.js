import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    updateWishlist: (state, action) => {
      state.items = action.payload;
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { updateWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
