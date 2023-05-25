import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Alert, Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { profileSettingThunk } from '../../features/redux/profile/profileThunk';

export default function ImagePage(): JSX.Element {
  const userSetting = useAppSelector((state) => state.oneProfile.oneUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(profileSettingThunk());
  }, []);
  const [message, setMessage] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Создаем объект FormData для получения данных из формы
    console.log(e.currentTarget);
    try {
      const response = await axios.post('http://localhost:3001/profile/image', formData);

      if (response.status === 200) {
        setMessage('Изображение успенно загружено');
      } else {
        setMessage('Ошибка при отправке изображения');
      }
    } catch (error) {
      console.error('Произошла ошибка', error);
    }
  };
  useEffect(() => {
    setMessage(message);
  }, [message]);
  return (
    <Row
    >
      
      <Col
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh',
        }}
      >
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {message && <Alert variant="primary" className="mt-5 " style={{ width: '500px',  textAlign: 'center', margin: 'auto', }}>{message}</Alert>}
          <Form.Group className="m-3 align-items-center">
            <Form.Label
              style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}
              className="mt -1 d-flex flex-column align-items-center"
            >
              Добавление фотографии
            </Form.Label>
            <Form.Control type="file" name="img" />
          </Form.Group>
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
        </Form>
      </Col>
      
    </Row>
  );
}
