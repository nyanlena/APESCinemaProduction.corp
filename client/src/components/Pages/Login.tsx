import * as React from 'react';
import axios from 'axios';
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
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/redux/store';
import { loginThunk } from '../../features/redux/user/thunkActions';
import type { LoginType } from '../../types';

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');

  const validateEmail = (email: string) => {
    setEmail(email);

    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ru)$/;
    if (!emailRegexp.test(email)) {
      setEmailError(
        'Электронный адрес должен быть валидным, содержать только латинские буквы, и оканчиваться на .com или .ru',
      );
      return false;
    }

    if (email.length <= 8) {
      setEmailError('Электронный адрес должен быть длиннее 8 символов');
      return false;
    }

    axios
      .post('api/auth/check-email', { email })
      .then(({ data }) => {
        if (!data.exists) {
          setEmailError(
            'Пользователь с таким электронным адресом не найден, пожалуйста, зарегистрируйтесь',
          );
          return false;
        } else {
          setEmailError('');
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  const validatePassword = (password: string) => {
    setPassword(password);

    if (password.length < 6) {
      setPasswordError('Пароль должен содержать не менее 6 символов');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as LoginType;

    try {
      const response = await axios.post('api/auth/login', data);

      setEmailError('');
      setPasswordError('');

      dispatch(loginThunk(data));
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setPasswordError('Пароль введен неверно, пожалуйста, повторите попытку');
      }
    }
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
                onChange={(e) => validateEmail(e.target.value)}
                error={Boolean(emailError)}
                helperText={emailError}
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
                onChange={(e) => validatePassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Войти
          </Button>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                У вас нет учетной записи? Зарегистрируйтесь
              </Link>
            </Grid>
            <Grid item xs>
              <Link component={RouterLink} to="/login/forget" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <a
              href="http://localhost:3001/api/v1/login/google"
              style={{ textAlign: 'center', marginTop: '10px' }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="google"
                style={{ width: '8%' }}
              />
            </a>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
