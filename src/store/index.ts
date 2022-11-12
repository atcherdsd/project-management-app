import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authCalls } from './features/authCalls';
const rootReducer = combineReducers({ [authCalls.reducerPath]: authCalls.reducer });

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authCalls.middleware),
  });
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
