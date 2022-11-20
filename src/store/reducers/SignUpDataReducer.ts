import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { StateSignUp, ResponseStateSignUp } from 'types/formTypes';

const initialState: StateSignUp = {
  signUpData: {
    name: '',
    login: '',
    _id: '',
  },
};

export const signUpDataSlice = createSlice({
  name: 'signUpData',
  initialState,
  reducers: {
    setSignUpDataToRedux: (state, action: PayloadAction<ResponseStateSignUp>) => {
      state.signUpData = action.payload;
    },
  },
});

export const { setSignUpDataToRedux } = signUpDataSlice.actions;
export default signUpDataSlice.reducer;
