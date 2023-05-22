import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { Col, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import {
  getAllPhotoThunk,
  getOneProjThunk,
} from '../../features/redux/seachProjects/seachProjThunk';
import OneProjectCard from './OneProjectCard';

export default function Project(): JSX.Element {
  const { id } = useParams();
  console.log(id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOneProjThunk(Number(id)));
  }, []);
  const project = useAppSelector((store) => store.postsProjects.postsProjects);

  console.log(project[0]);
  return (
    <Container>
      {project?.map((el) => (
        <Col key={el.id}>
          <OneProjectCard project={el} />
        </Col>
      ))}
    </Container>
  );
}
