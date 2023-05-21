import React from 'react';
import { Card } from 'antd';
import { Container } from 'react-bootstrap';
import { BackendUserType } from '../../types';
import { useAppSelector } from '../../features/redux/store';

const { Meta } = Card;

type ProfileCardProps = {
  profile: BackendUserType;
};

export default function SearchProfileCard({ profile }: ProfileCardProps): JSX.Element {
  const { categories } = useAppSelector((store) => store.categories);
  const categoryTitle = categories?.find((category) => category.id === profile.categoryId)?.title;

  return (
    <Container style={{ marginTop: 30, marginBottom: 30 }}>
      <a href={`profile/${profile.id}`}>
        <Card
          hoverable
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img alt="example" src={profile.img} style={{ width: 150, height: 150 }} />
            <div style={{ marginLeft: '100px' }}>
              <Meta
                title={profile.lastName + ' ' + profile.firstName + ' ' + profile.patronymicname}
                style={{ marginTop: '20px' }}
              />
              <Meta title={categoryTitle || 'No Category'} style={{ marginTop: '20px' }} />
              <Meta title={profile.phone} style={{ marginTop: '20px' }} />
            </div>
          </div>
        </Card>
      </a>
    </Container>
  );
}
