import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FetchingUserType, UserType } from '../../../types';

const initialState: FetchingUserType = {
  status: 'fetching',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserType,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => action.payload,
    logoutUser: (state) => ({ status: 'guest' }),
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
