import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Col, Container, Modal } from 'react-bootstrap';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import type { BackendUserType } from '../../types';

type favoriteProps = {
  profile: BackendUserType;
};

function FavoriteCards({ profile }: favoriteProps): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((store) => store.categories);

  const categoryTitle = categories?.find((category) => category.id === profile.categoryId)?.title;

  const openModal = () => {
    setContactInfo('');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleContactInfoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactInfo(event.target.value);
  };

  const handleSendMessage = () => {
    try {
      axios.post('favorites/send', { email: profile.email, contactInfo }).then((response) => {
        console.log('Сообщение успешно отправлено', response);
        axios
          .put(`favorites/${profile.id}`, { userId: user.id, status: true })
          .then((updateResponse) => {
            console.log('Статус успешно обновлен', updateResponse);
          });
        closeModal();
        alert('Сообщение успешно отправлено');
      });
    } catch (error) {
      console.error('Ошибка при отправке сообщения', error);
      alert('Ошибка при отправке сообщения');
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          marginTop: '30px',
        }}
      >
        <Card
          style={{
            width: 260,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <a href={`profile/${profile.id}`}>
            <Card.Img
              variant="top"
              src={profile.img !== null ? `http://localhost:3001/${profile.img}` : '/img/400.png'}
              style={{
                width: 230,
                height: 240,
                objectFit: 'cover',
                borderRadius: '5px',
                marginTop: '20px',
              }}
            />
          </a>
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: '1 0 auto',
              marginTop: 'auto',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Card.Title>{`${profile.lastName} ${profile.firstName} ${profile.patronymicname}`}</Card.Title>
              <Card.Text>{categoryTitle || 'No category'}</Card.Text>
            </div>
            <Button variant="primary" onClick={openModal} style={{ width: '100%' }}>
              Отправить заявку
            </Button>
          </Card.Body>
        </Card>
        <Modal show={modalVisible} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Отправить сообщение</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              value={contactInfo}
              onChange={handleContactInfoChange}
              placeholder="Введите контактные данные"
              style={{ width: '100%', height: '150px' }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleSendMessage}>
              Отправить
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </Col>
  );
}

export default React.memo(FavoriteCards);
