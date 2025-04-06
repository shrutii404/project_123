import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth';

interface UserState {
  user: User | null;
}

const initialState: UserState = { user: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<User | null>) => {
      if (action.payload) {
        state.user = {
          _id: action.payload._id || action.payload.id || '',
          id: action.payload._id || action.payload.id || '',
          phoneNo: action.payload.phoneNo,
          name: action.payload.name || 'User',
          email: action.payload.email,
          address: action.payload.address,
          FavouriteProd: action.payload.FavouriteProd || [],
          isAdmin: action.payload.isAdmin || false
        };
      } else {
        state.user = null;
      }
    },
    userLogout: (state) => {
      state.user = null;
    },
    updateUserDetails: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user && action.payload) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { userLogin, userLogout, updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
