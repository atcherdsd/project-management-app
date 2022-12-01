import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LanguageReducer from './reducers/LanguageReducer';
import BoardReducer from './reducers/BoardReducer';
import SearchbarReducer from './reducers/SearchbarReducer';
import { authCalls } from '../API/authCalls';
import { boardsCalls } from '../API/boardsCalls';
import { columnsCalls } from '../API/columnsCalls';
import { tasksCalls } from '../API/tasksCalls';
import { enableMapSet } from 'immer';
import NavbarReducer from './reducers/NavbarReducer';
import { editProfileCalls } from '../API/editProfileCalls';
import SignUpDataReducer from './reducers/SignUpDataReducer';
import { usersCalls } from '../API/usersCalls';

enableMapSet();

const rootReducer = combineReducers({
  LanguageReducer,
  BoardReducer,
  SearchbarReducer,
  NavbarReducer,
  SignUpDataReducer,
  [authCalls.reducerPath]: authCalls.reducer,
  [editProfileCalls.reducerPath]: editProfileCalls.reducer,
  [usersCalls.reducerPath]: usersCalls.reducer,
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
        .concat(editProfileCalls.middleware)
        .concat(usersCalls.middleware)
        .concat(boardsCalls.middleware)
        .concat(columnsCalls.middleware)
        .concat(tasksCalls.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
