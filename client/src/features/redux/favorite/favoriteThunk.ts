import axios from 'axios';
import type { ChatTypes, FavoriteTypes } from '../../../types';
import type { AppThunk, ThunkActionCreater } from '../store';
import { RootState } from '../store';
import { addFavorite, removeFavorite, setFavorites } from './favoriteSlice';

// export const getFavoriteProfileThunk: ThunkActionCreater =
//   (projectId: number) => async (dispatch) => {
//     try {
//       const { data } = await axios.get<FavoriteTypes[]>(`/addpeople/${projectId}`);
//       dispatch(setFavorites(data));
//     } catch (error) {
//       console.error('Error: ', error);
//     }
//   };
export const getAllFavThunk =
  (fromId: FavoriteTypes['fromId']): AppThunk =>
  (dispatch) => {
    axios
      .get<FavoriteTypes[]>(`/addpeople/${fromId}`)
      .then(({ data }) => dispatch(setFavorites(data)))
      .catch(console.log);
  };
// export const sendMessageThunk: ThunkActionCreater<FavoriteTypes> = () => (dispatch) => {
//   try {
//     // axios.post<FavoriteTypes>('favorites/send');
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addFavoriteProfileThunk: ThunkActionCreater = (toId: number) => async (dispatch) => {
  try {
    const { data } = await axios.post<FavoriteTypes>('favorites', { toId });
    dispatch(addFavorite(data));
    return true; // возвращаем true, если добавление прошло успешно
  } catch (error) {
    console.error('Error: ', error);
    return false; // возвращаем false, если возникла ошибка
  }
};

export const deleteFavoriteProfileThunk: ThunkActionCreater<number> =
  (toId) => async (dispatch) => {
    try {
      const response = await axios.delete(`favorites/remove/${toId}`, { data: { toId } });
      if (response.status === 200) {
        dispatch(removeFavorite(toId));
        return true; // возвращаем true, если удаление прошло успешно
      }
      return false; // возвращаем false, если статус ответа не 200
    } catch (error) {
      console.error('Failed to delete favorite:', error);
      return false; // возвращаем false, если возникла ошибка
    }
  };
