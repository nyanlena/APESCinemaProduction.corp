import axios from 'axios';
import type { ChatTypes, FavoriteTypes } from '../../../types';
import type { AppThunk, ThunkActionCreater } from '../store';
import { RootState } from '../store';
import { addFavorite, removeFavorite, setFavorites } from './favoriteSlice';

export const getAllFavThunk =
  (fromId: FavoriteTypes['fromId']): AppThunk =>
  (dispatch) => {
    axios
      .get<FavoriteTypes[]>(`/addpeople/${fromId}`)
      .then(({ data }) => dispatch(setFavorites(data)))
      .catch(console.log);
  };

export const addFavoriteProfileThunk: ThunkActionCreater = (toId: number) => async (dispatch) => {
  try {
    const { data } = await axios.post<FavoriteTypes>('favorites', { toId });
    dispatch(addFavorite(data));
    return true;
  } catch (error) {
    console.error('Error: ', error);
    return false;
  }
};

export const deleteFavoriteProfileThunk: ThunkActionCreater<number> =
  (toId) => async (dispatch) => {
    try {
      const response = await axios.delete(`favorites/remove/${toId}`, { data: { toId } });
      if (response.status === 200) {
        dispatch(removeFavorite(toId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete favorite:', error);
      return false;
    }
  };
