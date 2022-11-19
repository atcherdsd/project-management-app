import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { StateSignUp, FormValues } from 'types/formTypes';

const initialState: StateSignUp = {
  signUpData: {
    name: '',
    login: '',
    password: '',
  },
};

export const signUpDataSlice = createSlice({
  name: 'signUpData',
  initialState,
  reducers: {
    setSignUpDataToRedux: (state, action: PayloadAction<FormValues>) => {
      state.signUpData = action.payload;
    },
  },
});

export const { setSignUpDataToRedux } = signUpDataSlice.actions;
export default signUpDataSlice.reducer;
