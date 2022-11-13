import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LanguageReducer from './reducers/LanguageReducer';
import { authCalls } from '../API/authCalls';
import { boardsCalls } from '../API/boardsCalls';

const rootReducer = combineReducers({
  LanguageReducer,
  [authCalls.reducerPath]: authCalls.reducer,
  [boardsCalls.reducerPath]: boardsCalls.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authCalls.middleware).concat(boardsCalls.middleware),
  });
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
