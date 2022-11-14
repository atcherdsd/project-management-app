import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LanguageReducer from './reducers/LanguageReducer';
import signUpDataReducer from './reducers/SignUpDataReducer';
import { authCalls } from '../API/authCalls';

const rootReducer = combineReducers({
  LanguageReducer,
  signUpDataReducer,
  [authCalls.reducerPath]: authCalls.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authCalls.middleware),
  });
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
