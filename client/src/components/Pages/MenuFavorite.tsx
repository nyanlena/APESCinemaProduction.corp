import React from 'react';
import { MenuItem, Select } from '@mui/material';
import type { FavoriteTypes } from '../../types';

type FavProps = {
  favorite: FavoriteTypes;
};
export default function MenuFavorite({ favorite }: FavProps): JSX.Element {
  return <MenuItem value={favorite.id}>{favorite.id}</MenuItem>;
}
