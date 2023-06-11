import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { forgetType } from '../../../types';

const initialState: forgetType = {
  email: '',
};

export const forgetSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<forgetType>) => action.payload,
  },
});

export const { setEmail } = forgetSlice.actions;

export default forgetSlice.reducer;
