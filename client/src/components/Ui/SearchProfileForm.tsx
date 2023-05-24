import React, { useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';
import { Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import {
  getCategoriesThunk,
  getFilteredProfilesThunk,
  getSearchedProfilesThunk,
} from '../../features/redux/searchProfile/searchProfileThunk';

type CategoryProps = {
  selectedCategory: string;
  setSelectedCategory: () => void;
  setFilteredProfiles: () => void;
};

function SearchProfileForm({
  selectedCategory,
  setSelectedCategory,
  setFilteredProfiles,
}: CategoryProps): JSX.Element {
  const [input, setInput] = useState<string>('');
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((store) => store.categories);
  const { profiles } = useAppSelector((store) => store.profiles);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInput(e.currentTarget.value);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getSearchedProfilesThunk(input));
    dispatch(getFilteredProfilesThunk(selectedCategory));
  }, [input, selectedCategory]);

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

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const categoryId = event.currentTarget.value;
    setSelectedCategory(categoryId);
    dispatch(getFilteredProfilesThunk(categoryId));
  }

  return (
    <Container
      className="d-flex justify-content-between align-items-center"
      style={{ marginTop: 30 }}
    >
      <select
        name="categoryId"
        className="form-select"
        aria-label="Default select example"
        onChange={(event) => handleCategoryChange(event)}
        value={selectedCategory}
        style={{ width: '300px' }}
      >
        <option value="">Выберите категорию</option>
        {categories?.map((el) => (
          <option key={el.id} value={el.id}>
            {el.title}
          </option>
        ))}
      </select>
      <Input
        style={{ width: '400px', height: '37px', margin: '10px' }}
        placeholder="Поиск по имени"
        value={input}
        onChange={changeHandler}
        id="exampleTitle"
        name="searchInput"
        type="text"
      />
    </Container>
  );
}

export default React.memo(SearchProfileForm);
