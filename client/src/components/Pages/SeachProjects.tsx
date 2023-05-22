import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { Input } from 'antd';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { addPostThunk, getAllPhotoThunk } from '../../features/redux/seachProjects/seachProjThunk';
import OneProjInSeach from './OneProjInSeach';
import type FormAddProjectType from '../../types/formAddProject';

export default function SeachProjects(): JSX.Element {
  const allProjects = useAppSelector((store) => store.postsProjects.postsProjects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPhotoThunk());
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState<FormAddProjectType>({ name: '', genre: '', address: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleOk = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addPostThunk(inputs));
    setIsModalOpen(false);
    setInputs({ name: '', genre: '', address: '' });
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
    setInputs({ name: '', genre: '', address: '' });
  };

  return (
    <Container style={{ marginTop: '20px' }}>
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
        onClick={showModal}
      >
        <h5 style={{ color: 'grey', fontSize: '40px', lineHeight: '20px', marginBottom: '5px' }}>
          +
        </h5>
      </Button>
      <Modal isOpen={isModalOpen} toggle={handleCancel}>
        <ModalHeader close={handleCancel}>Добавить съёмку</ModalHeader>
        <Form onSubmit={handleOk}>
          <ModalBody>
            <p>Введите ключевые моменты про ваш будущий проект</p>
            <Input
              onChange={handleChange}
              placeholder="Название проекта"
              value={inputs.name}
              name="name"
            />
            <Input onChange={handleChange} placeholder="Жанр" value={inputs.genre} name="genre" />
            <Input
              onChange={handleChange}
              placeholder="Адрес проведения"
              value={inputs.address}
              name="address"
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Добавить
            </Button>{' '}
            <Button color="info" onClick={handleCancel}>
              Отмена
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      {allProjects?.map((project) => (
        <Col key={project.id}>
          <OneProjInSeach project={project} />
        </Col>
      ))}
    </Container>
  );
}
