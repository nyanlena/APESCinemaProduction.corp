import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { BackendUserType } from '../../../types';

// Define the initial state using that type
type ProfilesSliceType = {
  oneUser: BackendUserType;
};
const initialState: ProfilesSliceType = {
  oneUser: {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    patronymicname: '',
    city: '',
    age: '',
    img: '',
    education: '',
    experience: '',
    aboutMe: '',
    linkPortfolio: '',
    phone: '',
    linkTg: '',
    linkInst: '',
    linkWA: '',
    categoryId: 0,
    portfolioLink: '',
  },
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<BackendUserType>) => {
      state.oneUser = action.payload;
    },
    modifyUserProfile: (state, action: PayloadAction<BackendUserType>) => {
      state.oneUser = { ...state.oneUser, ...action.payload };
    },
  },
});

export const { setUserProfile, modifyUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
