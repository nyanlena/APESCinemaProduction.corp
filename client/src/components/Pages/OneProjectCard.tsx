import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Button, Form } from 'react-bootstrap';
import { Input } from 'antd';
import { YMaps, Map, useYMaps } from '@pbe/react-yandex-maps';
import type { ProjectTypes } from '../../types';
import type FormAddProjectType from '../../types/formAddProject';
import { updatePostProject } from '../../features/redux/seachProjects/seachProjSlice';
import { useAppDispatch } from '../../features/redux/store';
import { updateProjThunk } from '../../features/redux/seachProjects/seachProjThunk';

type ProjectTypeProps = {
  project: ProjectTypes;
};

export default function OneProjectCard({ project }: ProjectTypeProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState({
    id: project.id,
    name: project.name,
    genre: project.genre,
    address: project.address,
    // startDate: project.startDate,
    // endDate: project.endDate,
  });
  const handleCancel = (): void => {
    setIsModalOpen(false);
    setInputs({
      id: project.id,
      name: project.name,
      genre: project.genre,
      address: project.address,
      // startDate: project.startDate,
      // endDate: project.endDate,
    });
  };
  const showModal = (): void => {
    setIsModalOpen(true);
    setInputs({
      id: project.id,
      name: project.name,
      genre: project.genre,
      address: project.address,
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleOk = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateProjThunk(inputs));
    setIsModalOpen(false);
  };
  return (
    <>
      <Card
        className="my-2"
        color="info"
        outline
        style={{
          width: '46rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CardHeader>
          <CardTitle tag="h5">Название проекта: {project.name}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Жанр проекта: {project.genre}</CardText>
          {/* <CardText>Адрес проведения съемки: {project.address}</CardText> */}

          <YMaps query={{ lang: 'en_RU' }}>
            <div>
              Адрес проведения съемки: {project.address}
              <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
            </div>
          </YMaps>

          <Button
            type="button"
            style={{ backgroundColor: '#F400A1', border: '0px' }}
            onClick={showModal}
          >
            Редактировать
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={isModalOpen} toggle={handleCancel}>
        <ModalHeader close={handleCancel}>Редактирование проекта</ModalHeader>
        <Form onSubmit={handleOk}>
          <ModalBody>
            <p style={{ color: 'blue' }}>Введите изменения в ваш проект</p>
            <p>Название проекта:</p>
            <Input
              placeholder="Название проекта"
              type="text"
              style={{ marginBottom: '10px' }}
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
            <p>Жанр:</p>
            <Input
              placeholder="Жанр"
              type="text"
              style={{ marginBottom: '10px' }}
              name="genre"
              value={inputs.genre}
              onChange={handleChange}
            />
            <p>Адрес проведения:</p>
            <Input
              placeholder="Адрес проведения"
              type="text"
              style={{ marginBottom: '10px' }}
              name="address"
              value={inputs.address}
              onChange={handleChange}
            />
            {/* <p>Дата начала:</p>
            <Input
              placeholder="Дата начала"
              type="date"
              style={{ marginBottom: '10px' }}
              name="startDate"
              onChange={handleChange}
            />
            <p>Дата окончания:</p>
            <Input
              placeholder="Дата окончания"
              type="date"
              style={{ marginBottom: '10px' }}
              name="endDate"
              onChange={handleChange}
            /> */}
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={handleCancel}>
              Отмена
            </Button>
            <Button color="info" type="submit">
              ОK
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
