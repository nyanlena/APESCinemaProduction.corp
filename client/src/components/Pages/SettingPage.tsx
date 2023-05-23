import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, ButtonGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import {
  changeSettingProfileThunk,
  imageProfileThunk,
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
  console.log(inputProfileSetting.id, 'profile');
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
    alert('Изменения сохранены');
  };
  const [image, setImage] = useState('');
  async function ImageSettigProfile(url: any) {
    const apiUrl = `http://localhost:3001/profile/setting`;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
  }
  const uriParts = uri.split('.');
  const formData = new FormData();
  formData.append('image', {
    uri,
    name: `image.${fileType}`,
    type: `image/${fileType}`,
  });
  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  dispatch(imageProfileThunk(apiUrl, options));}
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
        <Col md={4}>
          <div
            className="profile-settings__photo-upload"
            style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
          >
            <div
              className="profile-settings__photo-preview"
              style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}
            >
              {formData.profilePhoto ? (
                <img
                  src={URL.createObjectURL(formData.profilePhoto)}
                  alt="Profile"
                  style={{ transition: 'opacity 0.3s ease-in-out', opacity: '1' }}
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
        </Col>
        <Col md={4} className="d-flex flex-column align-items-center">
          {/* ФОТОГРАФИЯ ПРОФИЛЯ */}
          <div className="profile-settings__photo-upload" style={{ marginBottom: '20px' }}>
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
          </div>
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
        <Col md={4}>
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
              <Button variant="outline-primary" onClick={handleSaveProfileSetting}>
                Сохранить
              </Button>
              <Button variant="outline-primary">
                <Link to={`/profile/${userSetting.id}`}>Назад в профиль</Link>
              </Button>
            </ButtonGroup>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
