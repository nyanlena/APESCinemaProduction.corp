import axios from 'axios';
import { modifyUserProfile, setUserProfile } from './profileSlice';
import type { BackendUserType } from '../../../types';
import type { ThunkActionCreater } from '../store';
import type {
  BackendChangeProfileType,
  BackendProfileSettingType,
} from '../../../types/profileActionType';

export const profileSettingThunk: ThunkActionCreater = () => async (dispatch) => {
  axios<BackendUserType>(`profile/setting`)
    .then(({ data }) => dispatch(setUserProfile(data)))
    .catch(console.log);
};
export const profileThunk: ThunkActionCreater<number> = (num) => (dispatch) => {
  if (num) {
    axios<BackendUserType>(`profile/${num}`)
      .then(({ data }) => dispatch(setUserProfile(data)))
      .catch(console.log);
  } else console.log('Ошибка: значение num отсутствует');
};

export const changeProfileThunk: ThunkActionCreater<BackendChangeProfileType> =
  (inputprof) => async (dispatch) => {
    const response = await axios.patch<BackendUserType>(`/profile/api/${inputprof.id}`, {
      education: inputprof.education,
      experience: inputprof.experience,
      aboutMe: inputprof.aboutMe,
      userPortfolio: inputprof.userPortfolio,
    });
    if (response.status === 200) {
      dispatch(setUserProfile(response.data));
    }
  };

export const changeSettingProfileThunk: ThunkActionCreater<BackendProfileSettingType> =
  (inputSetting) => async (dispatch) => {
    const response = await axios.patch<BackendUserType>(`/profile/setting`, {
      id: inputSetting.id,
      email: inputSetting.email,
      firstName: inputSetting.firstName,
      lastName: inputSetting.lastName,
      patronymicname: inputSetting.patronymicname,
      city: inputSetting.city,
      age: inputSetting.age,
      img: inputSetting.city,
      phone: inputSetting.phone,
      linkTg: inputSetting.linkTg,
      linkInst: inputSetting.linkInst,
      linkWA: inputSetting.linkWA,
    });
    if (response.status === 200) {
      dispatch(setUserProfile(response.data));
    }
  };
