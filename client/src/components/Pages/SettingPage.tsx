import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import {
  changeSettingProfileThunk,
  profileSettingThunk,
  profileThunk,
} from '../../features/redux/profile/profileThunk';
import type {
  BackendChangeProfileSettingType,
} from '../../types/profileActionType';

export default function SettingPage(): JSX.Element {
  const userSetting = useAppSelector((state) => state.oneProfile);
  const dispatch = useAppDispatch();
  console.log(user, 'gffdf');

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
    img: userSetting.city,
    phone: userSetting.phone,
    linkTg: userSetting.linkTg,
    linkInst: userSetting.linkInst,
    linkWA: userSetting.linkWA,
    categoryId: userSetting.categoryId,
    Category: userSetting.Category,
  });
  // useEffect(() => {
  //   setInputProfileSetting(inputProfileSetting);
  // }, [
  //   inputProfileSetting.email,
  //   inputProfileSetting.firstName,
  //   inputProfileSetting.lastName,
  //   inputProfileSetting.patronymicname,
  //   inputProfileSetting.city,
  //   inputProfileSetting.age,
  //   inputProfileSetting.img,
  //   inputProfileSetting.phone,
  //   inputProfileSetting.linkTg,
  //   inputProfileSetting.linkInst,
  //   inputProfileSetting.linkWA,
  // ]);

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputProfileSetting((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  const handleSaveProfileSetting = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(changeSettingProfileThunk(inputProfileSetting));
  };
  return (
    <div className="profile-settings">
      <h1 className="profile-settings__title">Настройки профиля</h1>

      <Row
        className="profile-settings__border"
        style={{ border: '1px solid #ccc', padding: '20px' }}
      >
        {/* <Col md={4}>
          <div className="profile-settings__photo-upload" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div className="profile-settings__photo-preview" style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
              {formData.profilePhoto ? (
                <img src={URL.createObjectURL(formData.profilePhoto)} alt="Profile" style={{ transition: 'opacity 0.3s ease-in-out', opacity: '1' }} />
              ) : (
                <div className="profile-settings__upload-icon" style={{ textAlign: 'center', fontSize: '24px', lineHeight: '80px', transition: 'opacity 0.3s ease-in-out', opacity: '1' }}>+</div>
              )}
            </div>
            <div className="profile-settings__upload-button" style={{ marginLeft: '10px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="profile-settings__input"
              />
              <Button variant="primary">Загрузить фото</Button>
            </div>
          </div>
        </Col> */}
        <Col md={4} className="d-flex flex-column align-items-center">
          {/* ФОТОГРАФИЯ ПРОФИЛЯ */}
          {/* <div className="profile-settings__photo-upload" style={{ marginBottom: '20px' }}>
            <div
              className="profile-settings__photo-preview"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: '10px',
                position: 'relative',
              }}
            >
              {formData.profilePhoto ? (
                <img
                  src={URL.createObjectURL(formData.profilePhoto)}
                  alt="Profile"
                  style={{
                    transition: 'opacity 0.3s ease-in-out',
                    opacity: '1',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  className="profile-settings__upload-icon"
                  style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    lineHeight: '80px',
                    transition: 'opacity 0.3s ease-in-out',
                    opacity: '1',
                  }}
                >
                  +
                </div>
              )}
            </div>
            <div className="profile-settings__upload-button">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="profile-settings__input"
              />
              <Button variant="primary">Загрузить фото</Button>
            </div>
          </div> */}
        </Col>

        <Col md={4}>
          <Form className="profile-settings__form">
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
                    : 'Введите Ваше имя'
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
                    : 'Введите Вашу фамилию'
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
          </Form>
        </Col>
        <Col md={4}>
          <Form className="profile-settings__form">
            <Form.Group controlId="email">
              <Form.Label>Почта</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={inputProfileSetting.email}
                onChange={handleChangeProfile}
                placeholder={
                  inputProfileSetting.email ? ` ${inputProfileSetting.email}` : 'Укажите Вашу почту'
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
                  inputProfileSetting.phone
                    ? ` ${inputProfileSetting.phone}`
                    : 'Укажите Ваш номер телефона'
                }
                className="profile-settings__input"
              />
            </Form.Group>

            <Form.Group controlId="instagram">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                name="instagram"
                value={inputProfileSetting.linkInst}
                onChange={handleChangeProfile}
                placeholder={
                  inputProfileSetting.linkInst ? ` ${inputProfileSetting.linkInst}` : 'Введите имя'
                }
                className="profile-settings__input"
              />
            </Form.Group>

            <Form.Group controlId="telegram">
              <Form.Label>Telegram</Form.Label>
              <Form.Control
                type="text"
                name="telegram"
                value={inputProfileSetting.linkTg}
                onChange={handleChangeProfile}
                placeholder={
                  inputProfileSetting.linkTg ? ` ${inputProfileSetting.linkTg}` : 'Введите имя'
                }
                className="profile-settings__input"
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleSaveProfileSetting}
              className="profile-settings__save-button"
              style={{ marginTop: '20px' }}
            >
              Сохранить
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
