import axios from 'axios';
import { FavoriteTypes } from '../../../types';
import { RootState, ThunkActionCreater } from '../store';
import { setFavorites } from './favoriteSlice';

export const getFavoriteProfileThunk: ThunkActionCreater = () => async (dispatch) => {
  try {
    const { data } = await axios.get<FavoriteTypes[]>('favorites');
    dispatch(setFavorites(data));
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const addFavoriteProfileThunk: ThunkActionCreater = (receiverId) => async (dispatch) => {
  try {
    const { data } = await axios.post<FavoriteTypes[]>('favorites');
    dispatch(setFavorites(data));
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const deleteFavoriteProfileThunk: ThunkActionCreater = (receiverId) => async (dispatch) => {
  try {
    await axios.delete('favorites/remove', { data: { receiverId } });
    dispatch(getFavoriteProfileThunk());
  } catch (error) {
    console.error('Failed to delete favorite:', error);
  }
};
