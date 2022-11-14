import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LanguageReducer from './reducers/LanguageReducer';
import { authCalls } from '../API/authCalls';
import { boardsCalls } from '../API/boardsCalls';
import { columnsCalls } from '../API/columnsCalls';

const rootReducer = combineReducers({
  LanguageReducer,
  [authCalls.reducerPath]: authCalls.reducer,
  [boardsCalls.reducerPath]: boardsCalls.reducer,
  [columnsCalls.reducerPath]: columnsCalls.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authCalls.middleware)
        .concat(boardsCalls.middleware)
        .concat(columnsCalls.middleware),
  });
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
