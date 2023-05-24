import axios from 'axios';
import type { ThunkActionCreater } from '../store';
import {
  setPostsProject,
  addPostProject,
  deletePostProject,
  updatePostProject,
  setOnePostsProject,
} from './seachProjSlice';
import type { ProjectTypes } from '../../../types';
import type FormAddProjectType from '../../../types/formAddProject';

export const getAllPhotoThunk: ThunkActionCreater = () => (dispatch) => {
  axios
    .get<ProjectTypes[]>('/seach/projects')
    .then(({ data }) => dispatch(setPostsProject(data)))
    .catch((err) => console.log(err));
};

export const getOneProjThunk: ThunkActionCreater<number> = (id) => async (dispatch) => {
  await axios
    .get<ProjectTypes[]>(`/projects/${id}`)
    .then(({ data }) => dispatch(setOnePostsProject(data)))
    .catch((err) => console.log(err));
};

export const addPostThunk: ThunkActionCreater<FormAddProjectType> = (input) => async (dispatch) => {
  const response = await axios.post<FormAddProjectType>('/seach/projects', {
    name: input.name,
    genre: input.genre,
    address: input.address,
  });
  if (response.status === 200) {
    dispatch(addPostProject(response.data));
  }
};

export const updateProjThunk: ThunkActionCreater<ProjectTypes> = (input) => async (dispatch) => {
  const response = await axios.patch<ProjectTypes>(`/projects/${input.id}`, {
    name: input.name,
    genre: input.genre,
    address: input.address,
    startDate: input.startDate,
    endDate: input.endDate,
  });
  if (response.status === 200) {
    dispatch(updatePostProject(response.data));
  }
};

export const deletePhotoThunk: ThunkActionCreater<number> = (postid) => async (dispatch) => {
  const response = await axios.delete(`/seach/projects/${postid}`);
  if (response.status === 200) {
    dispatch(deletePostProject(postid));
  }
};
