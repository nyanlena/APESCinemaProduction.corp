import React, { useState } from 'react';
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
  CardFooter,
} from 'reactstrap';
import { Button, Form } from 'react-bootstrap';
import { Input } from 'antd';
import { YMaps, Placemark, withYMaps } from '@pbe/react-yandex-maps';
import moment from 'moment';
import 'moment/locale/ru';
import type { ProjectTypes } from '../../types';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { updateProjThunk } from '../../features/redux/seachProjects/seachProjThunk';
import Map from '../Ui/Map';
import ModalAddProj from './ModalAddProj';
import ChatPage from './ChatPage';

type ProjectTypeProps = {
  project: ProjectTypes;
};

const MapWithYMaps = withYMaps(Map, true);

export default function OneProjectCard({ project }: ProjectTypeProps): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState({
    id: project.id,
    name: project.name,
    genre: project.genre,
    address: project.address,
    startDate: project.startDate,
    endDate: project.endDate,
  });

  const handleCancel = (): void => {
    setIsModalOpen(false);
    setInputs({
      id: project.id,
      name: project.name,
      genre: project.genre,
      address: project.address,
      startDate: project.startDate,
      endDate: project.endDate,
    });
  };
  const showModal = (): void => {
    setIsModalOpen(true);
    setInputs({
      id: project.id,
      name: project.name,
      genre: project.genre,
      address: project.address,
      startDate: project.startDate,
      endDate: project.endDate,
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

  // const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  // const showModalAdd = (): void => {
  //   setIsModalOpenAdd(true);
  // };
  // const cancelHand = (): void => {
  //   setIsModalOpenAdd((prev) => !prev);
  // };
  const [showInput, setShowInput] = useState(false);
  const submitHandler = (): void => {
    setShowInput((prev) => !prev);
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
          {project.User.Category?.title ? (
            <CardText>
              {project.User.Category.title}:{' '}
              <a href={`/profile/${project.userId}`}>
                {project.User.firstName} {project.User.lastName}
              </a>
            </CardText>
          ) : null}
          <CardText>Жанр проекта: {project.genre}</CardText>
          <CardText>Дата начала: {moment(project.startDate).format('LL')}</CardText>
          <CardText>Дата окончания: {moment(project.endDate).locale('ru').format('LL')}</CardText>
          <CardText>Адрес проведения съемки: {project.address}</CardText>
          {/* <div style={{ height: '30px' }}>
            <Map project={project} />
          </div> */}
          {/* <YMaps query={{ lang: 'en_RU' }}>
            <div>
              Адрес проведения съемки: {project.address}
              <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
            </div>
          </YMaps> */}
          {project.userId === user.id && (
            <Button
              type="button"
              style={{ backgroundColor: '#F400A1', border: '0px' }}
              onClick={showModal}
            >
              Редактировать
            </Button>
          )}
        </CardBody>
        <CardFooter>
          <Button
            type="button"
            style={{
              padding: '0',
              height: '40px',
              width: '40px',
              borderRadius: '50px',
              backgroundColor: 'white',
              border: '1px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '3px 3px 5px 0px rgba(128, 128, 128, 0.8)',
            }}
            className="btn btn-dark"
            onClick={submitHandler}
          >
            <h5
              style={{ color: 'grey', fontSize: '40px', lineHeight: '20px', marginBottom: '5px' }}
            >
              +
            </h5>
          </Button>
          {!showInput && <span style={{ color: 'blue' }}>Добавить персонал в проект</span>}
          {showInput ? (
            <Form>
              <Input />
              <Button type="submit" style={{ border: '20px', backgroundColor: 'green' }}>
                Добавить
              </Button>
              <Button
                type="button"
                style={{ border: '20px', backgroundColor: 'red' }}
                onClick={submitHandler}
              >
                Отмена
              </Button>
            </Form>
          ) : null}
        </CardFooter>
      </Card>
      {project.User.img ? (
        <img
          alt="pic"
          src={
            project.User.img !== null ? `http://localhost:3001/${project.User.img}` : '/img/400.png'
          }
          style={{ width: '60px', borderRadius: '50px', border: '2px solid red' }}
        />
      ) : (
        <p>Главный: {project.User.firstName}</p>
      )}
      {/* <ModalAddProj showModalAdd={showModalAdd} cancelHand={cancelHand} /> */}
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
            <p>Дата начала:</p>
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
            />
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
      <ChatPage />
    </>
  );
}
