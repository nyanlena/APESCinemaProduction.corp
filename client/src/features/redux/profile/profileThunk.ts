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
type UpdateUserType = {
  changeProfile: BackendUserType;
  id: number;
};
export const changeProfileThunk: ThunkActionCreater<UpdateUserType> =
  (changeProfile) => (dispatch) => {
    axios
      .patch<BackendUserType>(`profile/api/${changeProfile.id}`, changeProfile)
      .then(({ data }) => dispatch(modifyUserProfile(data)))
      .catch(console.log);
  };
