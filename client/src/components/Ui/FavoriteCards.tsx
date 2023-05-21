import React from 'react';
import { BackendUserType } from '../../types';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useAppSelector } from '../../features/redux/store';
import { Container } from 'react-bootstrap';

type favoriteProps = {
  profile: BackendUserType;
};

export default function FavoriteCards({ profile }: favoriteProps): JSX.Element {
  const { categories } = useAppSelector((store) => store.categories);

  const categoryTitle = categories?.find((category) => category.id === profile.categoryId)?.title;

  return (
    <Container>
      <a href={`profile/${profile.id}`}>
        <Card hoverable style={{ width: 240 }} cover={<img alt="example" src={profile.img} />}>
          <Meta
            title={profile.lastName + ' ' + profile.firstName + ' ' + profile.patronymicname}
            description={categoryTitle || 'No category'}
          />
        </Card>
      </a>
    </Container>
  );
}
