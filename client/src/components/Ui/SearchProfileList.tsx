import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { getProfilesThunk } from '../../features/redux/searchProfile/searchProfileThunk';
import SearchProfileCard from './SearchProfileCard';
import { BackendUserType } from '../../types';

type FilteredProfileProps = {
  filteredProfiles: BackendUserType[];
};

export default function SearchProfileList({ filteredProfiles }: FilteredProfileProps): JSX.Element {
  const { profiles } = useAppSelector((store) => store.profiles);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfilesThunk());
  }, []);

  return (
    <Row>
      {filteredProfiles.map((profile) => (
        <SearchProfileCard key={profile.id} profile={profile} />
      ))}
    </Row>
  );
}
