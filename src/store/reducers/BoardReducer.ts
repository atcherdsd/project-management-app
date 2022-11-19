import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnStateType, ColumnPayloadProps } from '../../types/BoardItemsLocalStateTypes';

const initialState = {
  columns: <ColumnStateType>new Map(),
};

export const BoardSlice = createSlice({
  name: 'boardsLocalState',
  initialState,
  reducers: {
    setLocalColumn(state, action: PayloadAction<ColumnPayloadProps>) {
      state.columns.set(action.payload[0], action.payload[1]);
    },
  },
});

export default BoardSlice.reducer;
