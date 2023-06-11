import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../../features/redux/store';
import forgetThunk from '../../features/redux/passwordForget/forgetThunk';
import { Modal } from 'antd';
import { forgetType } from '../../types';

export default function EmailForgotPassword(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const success = () => {
    Modal.success({
      title: `Письмо отправлено`,
      content: `На указанную почту выслана ссылка для смены пароля`,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData: forgetType = {
      email: (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
    };
    dispatch(forgetThunk(formData));
    success();
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
          Введите email для сброса пароля
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
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Отправить
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
