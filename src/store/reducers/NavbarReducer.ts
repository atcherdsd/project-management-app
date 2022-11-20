import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavbarState } from '../../types/navbarType';

const initialState: NavbarState = {
  isOpenedMenu: false,
};

export const NavbarSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu(state, action: PayloadAction<boolean>) {
      state.isOpenedMenu = action.payload;
    },
  },
});

export const { setMenu } = NavbarSlice.actions;

export default NavbarSlice.reducer;
