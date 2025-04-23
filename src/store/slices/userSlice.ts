import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, TourPackage } from '../../types';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: UserState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateBalance: (state: UserState, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.balance = action.payload;
      }
    },
    selectPackage: (state: UserState, action: PayloadAction<TourPackage>) => {
      if (state.currentUser) {
        state.currentUser.selectedPackage = action.payload;
      }
    },
    logout: (state: UserState) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  updateBalance,
  selectPackage,
  logout,
} = userSlice.actions;

export default userSlice.reducer; 