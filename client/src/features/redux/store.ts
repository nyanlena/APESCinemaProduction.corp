import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import postsProjectsReducer from './seachProjects/seachProjSlice';
import profileCategoriesReducer from './searchProfile/searchProfileSlice';
import userReducer from './user/userSlice';
import FavoritesReducer from './favorite/favoriteSlice';


const store = configureStore({
  reducer: {
    postsProjects: postsProjectsReducer,
    user: userReducer,
    profiles: profileCategoriesReducer,
    categories: profileCategoriesReducer,
    favorites: FavoritesReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type ThunkActionCreater<ThunkArgument = void> = (arg: ThunkArgument) => AppThunk;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
