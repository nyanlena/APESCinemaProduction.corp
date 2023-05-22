import React from 'react';
import { BackendUserType } from '../../types';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useAppSelector } from '../../features/redux/store';
import { Col, Container } from 'react-bootstrap';

type favoriteProps = {
  profile: BackendUserType;
};

export default function FavoriteCards({ profile }: favoriteProps): JSX.Element {
  const { categories } = useAppSelector((store) => store.categories);

  const categoryTitle = categories?.find((category) => category.id === profile.categoryId)?.title;

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <a href={`profile/${profile.id}`}>
        <Card
          hoverable
          style={{ width: 240, height: 400 }}
          cover={
            <img
              alt="example"
              src={profile.img}
              style={{ width: 210, objectFit: 'contain', borderRadius: '5px' }}
            />
          }
        >
          <Meta
            title={profile.lastName + ' ' + profile.firstName + ' ' + profile.patronymicname}
            description={categoryTitle || 'No category'}
          />
        </Card>
      </a>
    </Col>
  );
}
