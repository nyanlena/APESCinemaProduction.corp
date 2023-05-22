import axios from 'axios';
import { modifyUserProfile, setUserProfile } from './profileSlice';
import type { BackendUserType } from '../../../types';
import type { ThunkActionCreater } from '../store';

export const profileThunk: ThunkActionCreater<number> = (num) => (dispatch) => {
  if (num) {
    axios<BackendUserType>(`profile/${num}`)
      .then(({ data }) => dispatch(setUserProfile(data)))
      .catch(console.log);
  } else console.log('Ошибка: значение num отсутствует');
};

export const changeProfileThunk: ThunkActionCreater<BackendUserType> =
  (newProfile) => (dispatch) => {
    axios
      .patch<BackendUserType>(`profile/1`, newProfile)
      .then(({ data }) => dispatch(modifyUserProfile(data)))
      .catch(console.log);
  };
