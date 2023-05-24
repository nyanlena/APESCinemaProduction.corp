import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Col, Container, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { BackendUserType } from '../../types';
import { Box } from '@mui/material';

type favoriteProps = {
  profile: BackendUserType;
};

function FavoriteCards({ profile }: favoriteProps): JSX.Element {
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
        axios.put(`favorites/${profile.id}`, { status: true }).then((updateResponse) => {
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
      <Box component="form">
        <Card
          // hoverable
          style={{ width: 240, height: 400 }}
        >
          <Card.Body>
            {' '}
            <a href={`profile/${profile.id}`}>
              <img
                alt="example"
                src={profile.img}
                style={{ width: 210, objectFit: 'contain', borderRadius: '5px' }}
              />
            </a>
            <Card.Title>{`${profile.lastName} ${profile.firstName} ${profile.patronymicname}`}</Card.Title>
            <Card.Text>{categoryTitle || 'No category'}</Card.Text>
            <Button variant="primary" onClick={openModal}>
              Отправить заявку
            </Button>
          </Card.Body>
        </Card>
      </Box>
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
    </Col>
  );
}

export default React.memo(FavoriteCards);
