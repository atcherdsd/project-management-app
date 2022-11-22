import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initSearchbar = localStorage.getItem('searchbar') || '';

const initialState = {
  searchbar: initSearchbar,
};

export const SearchbarSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setSearchbar(state, action: PayloadAction<string>) {
      state.searchbar = action.payload;
      console.log(action.payload);
    },
  },
});

export default SearchbarSlice.reducer;
