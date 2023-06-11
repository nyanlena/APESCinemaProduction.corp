import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../../features/redux/store';
import { Modal } from 'antd';

export default function NewPassword(): JSX.Element {
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams();

  const [haveAccess, setHaveAccess] = React.useState(false);
  React.useEffect(() => {
    axios
      .post(`api/auth/login/forget/${uuid}`)
      .then(() => setHaveAccess(true))
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  }, []);

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

  const success = () => {
    Modal.success({
      title: 'Успешно',
      content: 'Ваш пароль был успешно изменен. Нажмите OK для перехода на страницу входа.',
      onOk: () => navigate('/login'),
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: Record<string, string> = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });
    axios
      .post(`api/auth/login/forget/new-password/${uuid}`, values)
      .then((response) => {
        if (response.status === 200) {
          success();
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  if (!haveAccess) return <div>Link is not working</div>;

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
          Введите новый пароль
        </Typography>
        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="text"
                id="codeword"
                label="Code Word"
                name="codeword"
                autoComplete="codeword"
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
                onChange={(e) => validatePassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Сменить пароль
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
