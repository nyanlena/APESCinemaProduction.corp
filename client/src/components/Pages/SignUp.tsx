import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../../features/redux/store';
import type { SignUpType } from '../../types/userType';
import { signUpThunk } from '../../features/redux/user/thunkActions';

export default function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as SignUpType;
    dispatch(signUpThunk(formData));
    navigate('/signup/role');
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
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                У вас уже есть учетная запись? Войти на сайт
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
