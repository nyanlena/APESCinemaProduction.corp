import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteTypes } from '../../../types';

// Define a type for the slice state
interface FavoritesState {
  favorites: FavoriteTypes[];
}

// Define the initial state using that type
const initialState: FavoritesState = {
  favorites: [],
};

export const FavoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<FavoritesState['favorites']>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<FavoriteTypes>) => {
      state.favorites.unshift(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<FavoriteTypes['id']>) => {
      state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = FavoritesSlice.actions;

export default FavoritesSlice.reducer;
