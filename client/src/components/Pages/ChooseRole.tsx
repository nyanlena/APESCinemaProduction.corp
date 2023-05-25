import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Link as RouterLink } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { signUpModalThunk, statusThunk } from '../../features/redux/user/thunkActions';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { getCategoriesThunk } from '../../features/redux/searchProfile/searchProfileThunk';
import type { SignUpType } from '../../types';

export default function ChooseRole(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // console.log(user.Category.statusId);

  const [openModal, setOpenModal] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleRoleClick = (statusId: number): void => {
    dispatch(statusThunk({ statusId }));
    // console.log(statusId);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSecondOpenModal = () => {
    setIsSecondModalOpen(true);
  };

  const handleSecondCloseModal = () => {
    setIsSecondModalOpen(false);
  };

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as SignUpType;
    dispatch(signUpModalThunk(formData));
    handleSecondOpenModal();
    // handleCloseModal();
    console.log(formData);

    if (selectedCategory !== '') navigate('/');
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  console.log(user.status === 'logged' ? user.statusId : 'cdjncjd ckjdcjks');
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
      <DialogActions>
        <Button
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
          onClick={() => {
            handleRoleClick(1);
            handleOpenModal();
          }}
        >
          Продакшн
        </Button>
        <Button
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
          onClick={() => {
            handleRoleClick(2);
            handleOpenModal();
          }}
        >
          Кинодел
        </Button>
      </DialogActions>
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle>Заполните имя и фамилию</DialogTitle>
        <DialogContent>
          <form onSubmit={handleModalSubmit}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="Имя"
              name="firstName"
              autoComplete="given-name"
              sx={{ mb: 2, mt: 1 }}
            />
            <TextField
              required
              fullWidth
              id="lastName"
              label="Фамилия"
              name="lastName"
              autoComplete="family-name"
              sx={{ mb: 2 }}
            />

            <DialogActions>
              <Button onClick={handleCloseModal}>Отмена</Button>
              {/* Добавьте кнопку для отправки формы */}
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'rgb(0, 92, 163)', color: 'white' }}
              >
                Отправить
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSecondModalOpen} onClose={handleSecondCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle>Выберите профессию</DialogTitle>
        <DialogContent>
          <form onSubmit={handleModalSubmit}>
            {user.status === 'logged' && user.statusId === 1 ? (
              <Select
                required
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Выбрать категорию"
                name="categoryId"
                value={selectedCategory}
                onChange={handleCategoryChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="1">Режиссёр</MenuItem>
                <MenuItem value="2">Продюсер</MenuItem>
                <MenuItem value="3">Фотограф</MenuItem>
                <MenuItem value="4">Клипмейкер</MenuItem>
                <MenuItem value="5">Режиссёр-постановщик</MenuItem>
              </Select>
            ) : (
              <Select
                required
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Выбрать категорию"
                name="categoryId"
                value={selectedCategory}
                onChange={handleCategoryChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="6">Актёр</MenuItem>
                <MenuItem value="7">Художник-постановщик</MenuItem>
                <MenuItem value="8">Оператор</MenuItem>
                <MenuItem value="9">Стилист</MenuItem>
                <MenuItem value="10">Гримёр</MenuItem>
                <MenuItem value="11">Светооператор</MenuItem>
                <MenuItem value="12">Монтажёр</MenuItem>
                <MenuItem value="13">Звукорежиссёр</MenuItem>
                <MenuItem value="14">Модель</MenuItem>
                <MenuItem value="15">Сценарист</MenuItem>
                <MenuItem value="16">Каскадёр</MenuItem>
              </Select>
            )}
            <DialogActions>
              <Button onClick={handleSecondCloseModal}>Отмена</Button>
              {/* Добавьте кнопку для отправки формы */}
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'rgb(0, 92, 163)', color: 'white' }}
              >
                Отправить
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
