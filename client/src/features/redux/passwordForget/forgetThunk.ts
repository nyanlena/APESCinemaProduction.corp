import axios from 'axios';
import type { ThunkActionCreater } from '../store';
import { setEmail } from './forgetSlice';
import { forgetType } from '../../../types';

const forgetThunk: ThunkActionCreater<forgetType> = (formData) => (dispatch) => {
  axios
    .post<forgetType>('api/auth/login/forget', formData)
    .then(({ data }) => dispatch(setEmail({ ...data })))
    .catch((error) => console.log(error));
};

export default forgetThunk;
