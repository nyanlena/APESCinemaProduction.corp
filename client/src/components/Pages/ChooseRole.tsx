import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../../features/redux/store';
import { statusThunk } from '../../features/redux/user/thunkActions';

export default function ChooseRole(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleRoleClick = (statusId: number): void => {
    dispatch(statusThunk({ statusId }));
    console.log(statusId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '84vh',
        msFlexDirection: 'row',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Кто вы?
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        size="large"
        sx={{
          mb: 2,
          width: '40%',
          backgroundColor: 'rgb(4, 21, 39)',
          '&:hover': {
            backgroundColor: 'rgb(0, 92, 163)',
            color: 'white',
          },
        }}
        onClick={() => handleRoleClick(1)}
      >
        Работник
      </Button>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        size="large"
        sx={{
          mb: 2,
          width: '40%',
          backgroundColor: 'rgb(4, 21, 39)',
          '&:hover': {
            backgroundColor: 'rgb(0, 92, 163)',
            color: 'white',
          },
        }}
        onClick={() => handleRoleClick(2)}
      >
        Работодатель
      </Button>
    </Box>
  );
}
