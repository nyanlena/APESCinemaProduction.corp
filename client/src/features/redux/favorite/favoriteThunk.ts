import axios from 'axios';
import { FavoriteTypes } from '../../../types';
import { RootState, ThunkActionCreater } from '../store';
import { addFavorite, removeFavorite, setFavorites } from './favoriteSlice';

export const getFavoriteProfileThunk: ThunkActionCreater = () => async (dispatch) => {
  try {
    const { data } = await axios.get<FavoriteTypes[]>('favorites');
    dispatch(setFavorites(data));
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const addFavoriteProfileThunk: ThunkActionCreater = (toId: number) => async (dispatch) => {
  try {
    const { data } = await axios.post<FavoriteTypes>('favorites', { toId });
    dispatch(addFavorite(data));
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const deleteFavoriteProfileThunk: ThunkActionCreater<number> =
  (toId) => async (dispatch) => {
    try {
      const response = await axios.delete(`favorites/remove/${toId}`);
      if (response.status === 200) {
        dispatch(removeFavorite(toId));
      }
    } catch (error) {
      console.error('Failed to delete favorite:', error);
    }
  };
