import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../../features/redux/store';
import { loginThunk } from '../../features/redux/user/thunkActions';
import type { LoginType } from '../../types';

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as LoginType;

    dispatch(loginThunk(data));
  };

  const handleOpenEyeClick = () => {
    const x = document.getElementById('hands');
    const y = document.getElementById('animcon');

    if (y && x) {
      y.style.backgroundImage =
        'url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey.gif)';
      x.style.marginTop = '110%';
    }
  };

  const handleCloseEyeClick = () => {
    const x = document.getElementById('hands');
    const y = document.getElementById('animcon');

    if (y && x) {
      y.style.backgroundImage =
        'url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey_pwd.gif)';
      x.style.marginTop = '0%';
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '76vh',
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Box className="animcon" id="animcon">
          <img
            id="hands"
            src="https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/hands.png"
          />
        </Box>
        <Typography component="h1" variant="h5">
          Вход на сайт
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onClick={handleOpenEyeClick}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onClick={handleCloseEyeClick}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                У вас нет учетной записи? Зарегистрируйтесь
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
