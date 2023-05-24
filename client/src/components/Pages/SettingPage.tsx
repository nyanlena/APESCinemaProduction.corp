import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, ButtonGroup, Alert } from 'react-bootstrap';
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

  const handleSaveProfileSetting = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(changeSettingProfileThunk(inputProfileSetting));
    setInputProfileSetting(inputProfileSetting);
  };

  return (
    <div className="profile-settings">
      <h1 className="profile-settings__title">Настройки профиля</h1>

      <Row
        className="profile-settings__border"
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '10px',
          margin: '10px 0',
        }}
      >
        <Col md={2}></Col>
        <Col md={2} className="d-flex flex-column align-items-center">
          {/* ФОТОГРАФИЯ ПРОФИЛЯ */}
        </Col>

        <Col md={4}>
          <Form className="profile-settings__form" encType="multipart/form-data">
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
          </Form>
        </Col>
        <Col md={3}>
          <Form className="profile-settings__form">
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
            <ButtonGroup
              aria-label="Basic example"
              className="mt-3 "
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Button type="submit" variant="outline-primary" onClick={handleSaveProfileSetting}>
                Сохранить
              </Button>
              <Button variant="outline-primary" onClick={(e) => e.preventDefault()}>
                <Link to={`/profile/${userSetting.id}`}>Назад в профиль</Link>
              </Button>
            </ButtonGroup>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
