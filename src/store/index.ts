import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LanguageReducer from './reducers/LanguageReducer';
import BoardReducer from './reducers/BoardReducer';
import { authCalls } from '../API/authCalls';
import { boardsCalls } from '../API/boardsCalls';
import { columnsCalls } from '../API/columnsCalls';
import { tasksCalls } from '../API/tasksCalls';
import { enableMapSet } from 'immer';

enableMapSet();

const rootReducer = combineReducers({
  LanguageReducer,
  BoardReducer,
  [authCalls.reducerPath]: authCalls.reducer,
  [boardsCalls.reducerPath]: boardsCalls.reducer,
  [columnsCalls.reducerPath]: columnsCalls.reducer,
  [tasksCalls.reducerPath]: tasksCalls.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(authCalls.middleware)
        .concat(boardsCalls.middleware)
        .concat(columnsCalls.middleware)
        .concat(tasksCalls.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
