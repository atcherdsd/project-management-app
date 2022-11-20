import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LanguageReducer from './reducers/LanguageReducer';
import NavbarReducer from './reducers/NavbarReducer';

const rootReducer = combineReducers({ LanguageReducer, NavbarReducer });

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
