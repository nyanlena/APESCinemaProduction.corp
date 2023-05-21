import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchProfileForm from '../Ui/SearchProfileForm';
import SearchProfileList from '../Ui/SearchProfileList';
import { BackendUserType } from '../../types';
import { useAppSelector } from '../../features/redux/store';

export default function SearchProfiles(): JSX.Element {
  const [filteredProfiles, setFilteredProfiles] = useState<BackendUserType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { profiles } = useAppSelector((store) => store.profiles);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = profiles.filter(
        (profile) => profile.categoryId === Number(selectedCategory),
      );
      console.log('Filtered profiles:', filtered);
      setFilteredProfiles(filtered);
    } else {
      setFilteredProfiles(profiles);
    }
  }, [selectedCategory, profiles]);

  return (
    <Container>
      <SearchProfileForm
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setFilteredProfiles={setFilteredProfiles}
      />
      <SearchProfileList filteredProfiles={filteredProfiles} />
    </Container>
  );
}
