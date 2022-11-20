import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LanguageReducer from './reducers/LanguageReducer';
import { authCalls } from '../API/authCalls';
import { getUser } from '../API/editProfileCalls';
import SignUpDataReducer from './reducers/SignUpDataReducer';

const rootReducer = combineReducers({
  LanguageReducer,
  SignUpDataReducer,
  [authCalls.reducerPath]: authCalls.reducer,
  [getUser.reducerPath]: getUser.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authCalls.middleware, getUser.middleware),
  });
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
