import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { apiSlice } from './slices/apiSlice';
import { cartSlice } from './slices/cartSlice';
import { wishlistSlice } from './slices/wishlistSlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
