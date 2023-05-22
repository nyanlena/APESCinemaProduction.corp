import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import FavoriteCards from '../Ui/FavoriteCards';
import {
  getCategoriesThunk,
  getFavoriteProfilesThunk,
} from '../../features/redux/searchProfile/searchProfileThunk';
import { BackendUserType } from '../../types';

export default function Favorites(): JSX.Element {
  const [filteredProfiles, setFilteredProfiles] = useState<BackendUserType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { profiles } = useAppSelector((store) => store.profiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavoriteProfilesThunk());
    dispatch(getCategoriesThunk());
  }, []);

  return (
    <Container>
      <Row>
        {profiles.map((profile) => (
          <FavoriteCards key={profile.id} profile={profile} />
        ))}
      </Row>
    </Container>
  );
}
