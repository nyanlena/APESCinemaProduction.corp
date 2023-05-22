import axios from 'axios';
import type { ThunkActionCreater } from '../store';
import type { BackendUserType, SignUpType } from '../../../types';
import { logoutUser, setUser } from './userSlice';

export const checkUserThunk: ThunkActionCreater = () => (dispatch) => {
  axios<BackendUserType>('/api/auth/check')
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch(() => dispatch(setUser({ status: 'guest' })));
};

export const logoutThunk: ThunkActionCreater = () => (dispatch) => {
  axios('/api/auth/logout')
    .then(() => dispatch(logoutUser()))
    .catch((err) => console.log(err));
};

export const signUpThunk: ThunkActionCreater<SignUpType> = (userData) => (dispatch) => {
  axios
    .post<BackendUserType>('/api/auth/signup', userData)
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch((err) => console.log(err));
};

export const loginThunk: ThunkActionCreater<SignUpType> = (userData) => (dispatch) => {
  axios
    .post<BackendUserType>('/api/auth/login', userData)
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch((err) => console.log(err));
};
