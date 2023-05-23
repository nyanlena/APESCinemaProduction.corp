import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { BackendUserType } from '../../../types';
import type { BackendChangeProfileSettingType, BackendChangeProfileType } from '../../../types/profileActionType';

// Define the initial state using that type
type ProfilesSliceType = {
  oneUser: BackendChangeProfileSettingType;
};
const initialState: ProfilesSliceType = {
  oneUser: {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    patronymicname: '',
    city: '',
    age: '',
    img: '',
    education: '',
    experience: '',
    aboutMe: '',
    phone: '',
    linkTg: '',
    linkInst: '',
    linkWA: '',
    categoryId: 0,
    userPortfolio: '',
  },
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<BackendUserType>) => {
      state.oneUser = action.payload;
    },
    modifyUserProfile: (state, action: PayloadAction<BackendChangeProfileType>) => {
      state.oneUser = { ...state.oneUser, ...action.payload };
    },
  },
});

export const { setUserProfile, modifyUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
