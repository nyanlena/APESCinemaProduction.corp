import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackendUserType, CategoryTypes } from '../../../types';

// Define a type for the slice state
interface ProfilesCategoryState {
  profiles: BackendUserType[];
  categories: CategoryTypes[];
}

// Define the initial state using that type
const initialState: ProfilesCategoryState = {
  profiles: [],
  categories: [],
};

export const profileCategoriesSlice = createSlice({
  name: 'profiles&categories',
  initialState,
  reducers: {
    setProfiles: (state, action: PayloadAction<ProfilesCategoryState['profiles']>) => {
      state.profiles = action.payload;
    },
    setCategories: (state, action: PayloadAction<ProfilesCategoryState['categories']>) => {
      state.categories = action.payload;
    },
  },
});

export const { setProfiles, setCategories } = profileCategoriesSlice.actions;

export default profileCategoriesSlice.reducer;
