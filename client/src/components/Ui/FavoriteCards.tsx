import React from 'react';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { Button, Col, Container } from 'react-bootstrap';
import { BackendUserType } from '../../types';
import { Box } from '@mui/material';
import { sendMessageThunk } from '../../features/redux/favorite/favoriteThunk';

type favoriteProps = {
  profile: BackendUserType;
};

function FavoriteCards({ profile }: favoriteProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((store) => store.categories);

  const categoryTitle = categories?.find((category) => category.id === profile.categoryId)?.title;

  const sendMessageHandler = () => {
    try {
      dispatch(sendMessageThunk()).then(() => {
        alert('Вы отправили заявку, дождитесь ответа');
      });
    } catch (e) {
      console.log(e);
      alert('Ошибка при отправке заявки');
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Box component="form" onSubmit={sendMessageHandler}>
        <Card
          hoverable
          style={{ width: 240, height: 400 }}
          cover={
            <a href={`profile/${profile.id}`}>
              <img
                alt="example"
                src={profile.img}
                style={{ width: 210, objectFit: 'contain', borderRadius: '5px' }}
              />
            </a>
          }
        >
          <Meta
            title={`${profile.lastName} ${profile.firstName} ${profile.patronymicname}`}
            description={categoryTitle || 'No category'}
          />
          <Button type="submit">Отправить заявку</Button>
        </Card>
      </Box>
    </Col>
  );
}

export default React.memo(FavoriteCards);
