import * as React from 'react';
import axios from 'axios';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../../features/redux/store';
import type { SignUpType } from '../../types/userType';
import { signUpThunk } from '../../features/redux/user/thunkActions';

export default function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');

  function validateEmail(email: string): boolean {
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
        if (data.exists) {
          setEmailError('Электронный адрес уже зарегистрирован, пожалуйста, войдите в систему');
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
  }

  function validatePassword(password: string): boolean {
    setPassword(password);

    if (!/^[a-zA-Z0-9!]*$/.test(password)) {
      setPasswordError('Пароль должен содержать только символы латиницы');
      return false;
    }

    if (!/^[A-Z]/.test(password)) {
      setPasswordError('Пароль должен начинаться с заглавной буквы');
      return false;
    }

    if (!/\d/.test(password)) {
      setPasswordError('Пароль должен содержать цифры');
      return false;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError('Пароль должен иметь символы "!@#$%^&*"');
      return false;
    }

    if (!/.{8,}/.test(password)) {
      setPasswordError('Пароль должен быть не меньше 8 символов');
      return false;
    }

    setPasswordError('');
    return true;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as SignUpType;
    if (!validatePassword(password) || !validateEmail(email)) {
      return;
    }
    dispatch(signUpThunk(formData));
    navigate('/signup/role');
    console.log(formData);
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

  const forgetHandler = () => {
    navigate('/login/forget');
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
                type="email"
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
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                У вас уже есть учетная запись? Войти на сайт
              </Link>
            </Grid>
            {/* <Grid item>
              <Button type="button" onClick={forgetHandler}>
                Забыли пароль?
              </Button>
            </Grid> */}
            <a
              href="http://localhost:3001/api/v1/login/google"
              style={{ textAlign: 'center', marginTop: '10px' }}
            >
              {/* <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="google"
                style={{ width: '8%' }}
              />
              {/* </Button> */}
            </a>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
