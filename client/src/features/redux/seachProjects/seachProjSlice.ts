import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ProjectTypes } from '../../../types';
import type { FormAddProjectType } from '../../../types/formAddProject';

// Define a type for the slice state
type SeachProjState = {
  postsProjects: ProjectTypes[];
};

// Define the initial state using that type
const initialState: SeachProjState = {
  postsProjects: [],
};

export const postsProjectsSlice = createSlice({
  name: 'postsProjects',
  initialState,
  reducers: {
    setPostsProject: (state, action: PayloadAction<SeachProjState['postsProjects']>) => {
      state.postsProjects = action.payload;
    },
    addPostProject: (state, action: PayloadAction<FormAddProjectType>) => {
      state.postsProjects.unshift(action.payload);
    },
    deletePostProject: (state, action: PayloadAction<ProjectTypes['id']>) => {
      const index = state.postsProjects.findIndex((el) => el.id === action.payload);
      if (index !== -1) state.postsProjects.splice(index, 1);
    },
    updatePostProject: (state, action: PayloadAction<ProjectTypes>) => {
      const index = state.postsProjects.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) state.postsProjects[index] = action.payload;
    },
    setOnePostsProject: (state, action: PayloadAction<ProjectTypes[]>) => {
      state.postsProjects = action.payload;
    },
  },
});

export const {
  setPostsProject,
  addPostProject,
  deletePostProject,
  updatePostProject,
  setOnePostsProject,
} = postsProjectsSlice.actions;

export default postsProjectsSlice.reducer;
