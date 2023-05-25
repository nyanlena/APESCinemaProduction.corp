import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, ButtonGroup, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import {
  changeSettingProfileThunk,
  profileSettingThunk,
} from '../../features/redux/profile/profileThunk';
import type { BackendChangeProfileSettingType } from '../../types/profileActionType';

export default function SettingPage(): JSX.Element {
  const userSetting = useAppSelector((state) => state.oneProfile.oneUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profileSettingThunk());
  }, []);

  const [inputProfileSetting, setInputProfileSetting] = useState<BackendChangeProfileSettingType>({
    id: userSetting.id,
    email: userSetting.email,
    firstName: userSetting.firstName,
    lastName: userSetting.lastName,
    patronymicname: userSetting.patronymicname,
    city: userSetting.city,
    age: userSetting.age,
    img: userSetting.img,
    education: userSetting.education,
    experience: userSetting.experience,
    aboutMe: userSetting.aboutMe,
    userPortfolio: userSetting.userPortfolio,
    phone: userSetting.phone,
    linkTg: userSetting.linkTg,
    linkInst: userSetting.linkInst,
    linkWA: userSetting.linkWA,
    categoryId: userSetting.categoryId,
    Category: userSetting.Category,
  });

  useEffect(() => {
    setInputProfileSetting(userSetting);
  }, [userSetting]);

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputProfileSetting((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSaveProfileSetting = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(changeSettingProfileThunk(inputProfileSetting));
    setInputProfileSetting(inputProfileSetting);
  };

  return (
    <div className="profile-settings mt-3">
      <h1 className="mt-1 d-flex flex-column align-items-center">Настройки профиля</h1>
      <Container>
        <Form
          onSubmit={handleSaveProfileSetting}
          className="profile-settings__form"
          encType="multipart/form-data"
        >
          <Row
            className="m-1 d-flex align-items-center"
            style={{
              border: '2px solid #ccc',
              padding: '30px',
              borderRadius: '50px',
              margin: '10px 10px 10px 10px',
              justifyContent: 'center',
            }}
          >
            <Col
              sm={4}
              style={{
                padding: '10px',
                borderRadius: '50px',
                margin: '10px 10px 10px 10px',
              }}
            >
              <Form.Group controlId="firstName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="firstName"
                  value={inputProfileSetting.firstName}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.firstName
                      ? ` ${inputProfileSetting.firstName}`
                      : 'Укажите Ваше имя'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  value={inputProfileSetting.lastName}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.lastName
                      ? ` ${inputProfileSetting.lastName}`
                      : 'Укажите Вашу фамилию'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>
              <Form.Group controlId="telegram">
                <Form.Label>Отчество</Form.Label>
                <Form.Control
                  type="text"
                  name="patronymicname"
                  value={inputProfileSetting.patronymicname}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.patronymicname
                      ? ` ${inputProfileSetting.patronymicname}`
                      : 'Укажите Ваше отчество'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Возраст</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="age"
                  value={inputProfileSetting.age}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.age ? ` ${inputProfileSetting.age}` : 'Укажите Ваш возраст'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>Город проживания</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="city"
                  value={inputProfileSetting.city}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.city
                      ? ` ${inputProfileSetting.city}`
                      : 'Укажите город проживания'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="email">
                <Form.Label>Почта</Form.Label>
                <Form.Control
                  disabled
                  type="email"
                  name="email"
                  value={inputProfileSetting.email}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.email ? ` ${inputProfileSetting.email}` : 'your@email.com'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Телефон</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  required
                  value={inputProfileSetting.phone}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.phone ? ` ${inputProfileSetting.phone}` : '+79876543210'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>

              <Form.Group controlId="instagram">
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  type="text"
                  name="linkInst"
                  value={inputProfileSetting.linkInst}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.linkInst ? ` ${inputProfileSetting.linkInst}` : '@instagram'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>

              <Form.Group controlId="telegram">
                <Form.Label>Telegram</Form.Label>
                <Form.Control
                  type="text"
                  name="linkTg"
                  value={inputProfileSetting.linkTg}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.linkTg ? ` ${inputProfileSetting.linkTg}` : '@telegram'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>
              <Form.Group controlId="telegram">
                <Form.Label>WhatsApp</Form.Label>
                <Form.Control
                  type="text"
                  name="linkWA"
                  value={inputProfileSetting.linkWA}
                  onChange={handleChangeProfile}
                  placeholder={
                    inputProfileSetting.linkWA
                      ? ` ${inputProfileSetting.linkWA}`
                      : 'Укажите данные WhatsApp'
                  }
                  className="profile-settings__input"
                />
              </Form.Group>
            </Col>
            <ButtonGroup
              aria-label="Basic example"
              className="align-items-center"
              style={{ display: 'flex', justifyContent: 'center', maxWidth: '700px' }}
            >
              <Button type="submit" variant="outline-primary" style={{ color: 'black' }}>
                Сохранить
              </Button>
              <Button type="button" variant="outline-primary">
                <Link
                  to={`/profile/${userSetting.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Назад в профиль
                </Link>
              </Button>
            </ButtonGroup>
          </Row>
        </Form>
        <br />
      </Container>
    </div>
  );
}
