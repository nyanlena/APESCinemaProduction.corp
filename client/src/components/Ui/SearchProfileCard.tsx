import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import Container from 'react-bootstrap/Container';
import { BackendUserType } from '../../types';
import { useAppSelector } from '../../features/redux/store';

const { Meta } = Card;

type ProfileCardProps = {
  profile: BackendUserType;
  delay?: number;
};

function SearchProfileCard({ profile, delay = 0 }: ProfileCardProps): JSX.Element {
  const { categories } = useAppSelector((store) => store.categories);
  const categoryTitle = categories?.find((category) => category.id === profile.categoryId)?.title;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Container
      style={{
        marginTop: 30,
        marginBottom: 30,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <a href={`/profile/${profile.id}`}>
        <Card
          hoverable
          style={{
            width: '850px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              alt="example"
              src={profile.img !== null ? `http://localhost:3001/${profile.img}` : '/img/400.png'}
              style={{ width: 150, objectFit: 'contain', borderRadius: '5px' }}
            />
            <div style={{ marginLeft: '200px' }}>
              {/* <Meta
                title={profile.lastName + ' ' + profile.firstName}
                style={{ marginTop: '20px' }}
              /> */}
              <h4 style={{ marginTop: '20px', textDecoration: 'none' }}>
                ФИО: {profile.lastName + ' ' + profile.firstName}
              </h4>
              {/* <Meta title={categoryTitle || 'No Category'} style={{ marginTop: '20px' }} />
              <Meta title={profile.phone} style={{ marginTop: '20px' }} /> */}
              <h5 style={{ marginTop: '20px', textDecoration: 'none' }}>
                Профессия: {categoryTitle || 'No Category'}
              </h5>
              <h5 style={{ marginTop: '20px', textDecoration: 'none' }}>
                Контактные данные:
                <br />
                {profile.phone}
                <br />
                e-mail: {profile.email}
              </h5>
            </div>
          </div>
        </Card>
      </a>
    </Container>
  );
}

export default React.memo(SearchProfileCard);
