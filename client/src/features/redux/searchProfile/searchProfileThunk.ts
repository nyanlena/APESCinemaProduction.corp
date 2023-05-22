import axios from 'axios';
import { BackendUserType, CategoryTypes } from '../../../types';
import { setProfiles, setCategories } from './searchProfileSlice';
import { RootState, ThunkActionCreater } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProfilesThunk: ThunkActionCreater = () => (dispatch) => {
  axios.get<BackendUserType[]>('search/profiles').then(({ data }) => dispatch(setProfiles(data)));
};

export const getFavoriteProfilesThunk: ThunkActionCreater = () => (dispatch) => {
  axios.get<BackendUserType[]>('favorites').then(({ data }) => dispatch(setProfiles(data)));
};

export const getFilteredProfilesThunk: ThunkActionCreater<string> =
  (input) => (dispatch, getState) => {
    try {
      const { profiles } = getState().profiles;

      if (input === '') {
        dispatch(setProfiles(profiles));
      } else {
        const filtered = profiles.filter((profile) => profile.categoryId === Number(input));
        dispatch(setProfiles(filtered));
      }
    } catch {
      console.log('axios error in filter of category');
    }
  };

export const getCategoriesThunk: ThunkActionCreater = () => async (dispatch) => {
  try {
    const response = await axios.get<CategoryTypes[]>('search/categories');
    dispatch(setCategories(response.data));
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getSearchedProfilesThunk: ThunkActionCreater = (searchQuery) => (dispatch) => {
  axios
    .post<BackendUserType[]>('search/profiles', { searchQuery })
    .then(({ data }) => dispatch(setProfiles(data)));
};
