import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LanguageReducer from './reducers/LanguageReducer';
import NavbarReducer from './reducers/NavbarReducer';
import { authCalls } from '../API/authCalls';
import { editProfileCalls } from '../API/editProfileCalls';
import SignUpDataReducer from './reducers/SignUpDataReducer';
import { usersCalls } from '../API/usersCalls';

const rootReducer = combineReducers({
  LanguageReducer,
  NavbarReducer,
  SignUpDataReducer,
  [authCalls.reducerPath]: authCalls.reducer,
  [editProfileCalls.reducerPath]: editProfileCalls.reducer,
  [usersCalls.reducerPath]: usersCalls.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authCalls.middleware,
        editProfileCalls.middleware,
        usersCalls.middleware
      ),
  });
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
