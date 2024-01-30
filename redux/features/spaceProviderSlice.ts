'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  initialSpaceProvider: string | null;
}

const initialState: AuthState = {
  initialSpaceProvider: null,
};

const spaceProviderSlice = createSlice({
  name: 'spaceProviderSlice',
  initialState,
  reducers: {
    setInitialSpaceProvider: (state, action: PayloadAction<string | null>) => {
      state.initialSpaceProvider = action.payload;
      localStorage.setItem('spaceProviderInfo', JSON.stringify(action.payload));
    },
    spaceProviderLogout: (state) => {
      state.initialSpaceProvider = null;
    },
    // Additional reducers if needed
  },
});

export const { setInitialSpaceProvider, spaceProviderLogout } =
  spaceProviderSlice.actions;

export default spaceProviderSlice.reducer;
