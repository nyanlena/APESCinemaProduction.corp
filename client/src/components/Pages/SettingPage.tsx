import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function SettingPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    city: '',
    email: '',
    phone: '',
    instagram: '',
    telegram: '',
    profilePhoto: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePhoto: file,
    }));
  };

  const handleSaveSettings = () => {
    // Выполнять сохранение настроек
    // ...
    console.log('Данные сохранены:');
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
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={formData.firstName ? formData.firstName : 'Введите имя'}
                className="profile-settings__input"
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Введите фамилию"
                className="profile-settings__input"
              />
            </Form.Group>

            <Form.Group controlId="age">
              <Form.Label>Возраст</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Введите возраст"
                className="profile-settings__input"
              />
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>Город проживания</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Введите город проживания"
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Введите почту"
                className="profile-settings__input"
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Введите телефон"
                className="profile-settings__input"
              />
            </Form.Group>

            <Form.Group controlId="instagram">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="Введите Instagram"
                className="profile-settings__input"
              />
            </Form.Group>

            <Form.Group controlId="telegram">
              <Form.Label>Telegram</Form.Label>
              <Form.Control
                type="text"
                name="telegram"
                value={formData.telegram}
                onChange={handleInputChange}
                placeholder="Введите Telegram"
                className="profile-settings__input"
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleSaveSettings}
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
