import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageType } from '../../types/language.type';

const initLanguage: LanguageType = (localStorage.getItem('language') as LanguageType) || 'EN';

const initialState = {
  language: initLanguage,
};

export const LanguageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageType>) {
      state.language = action.payload;
    },
  },
});

export default LanguageSlice.reducer;
