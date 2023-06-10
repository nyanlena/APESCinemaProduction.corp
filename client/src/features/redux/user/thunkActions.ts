import axios from 'axios';
import type { ThunkActionCreater } from '../store';
import type { BackendUserType, LoginType, SignUpType, StatusType } from '../../../types';
import { logoutUser, setUser } from './userSlice';

export const checkUserThunk: ThunkActionCreater = () => (dispatch) => {
  axios<BackendUserType>('api/auth/check')
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch(() => dispatch(setUser({ status: 'guest' })));
};

export const logoutThunk: ThunkActionCreater = () => async (dispatch) => {
  try {
    await axios('api/auth/logout');
    dispatch(logoutUser());
    window.location.href = '/';
  } catch (err) {
    console.log(err);
  }
};

export const signUpThunk: ThunkActionCreater<SignUpType> = (userData) => (dispatch) => {
  axios
    .post<BackendUserType>('api/auth/signup', userData)
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch((err) => console.log(err));
};

export const signUpModalThunk: ThunkActionCreater<SignUpType> = (userData) => (dispatch) => {
  axios
    .post<BackendUserType>('api/auth/signup/modal', userData)
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch((err) => console.log(err));
};

export const statusThunk: ThunkActionCreater<StatusType> = (userData) => (dispatch) => {
  axios
    .post<BackendUserType>('api/auth/signup/role', userData)
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch((err) => console.log(err));
};

export const loginThunk: ThunkActionCreater<LoginType> = (userData) => (dispatch) => {
  axios
    .post<BackendUserType>('api/auth/login', userData)
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch((err) => console.log(err));
};
