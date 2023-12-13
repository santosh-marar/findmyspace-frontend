import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { roomsApi } from './api/roomApi';
import { spaceProviderApi } from './api/spaceProviderApi';
import { spaceProviderAuthApi } from './api/spaceProviderAuthApi';
import spaceProviderAuthSlice from './features/spaceProviderSlice';

export const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
    [spaceProviderAuthApi.reducerPath]: spaceProviderAuthApi.reducer,
    [spaceProviderApi.reducerPath]: spaceProviderApi.reducer,
    spaceProvider: spaceProviderAuthSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      roomsApi.middleware,
      spaceProviderAuthApi.middleware,
      spaceProviderApi.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
