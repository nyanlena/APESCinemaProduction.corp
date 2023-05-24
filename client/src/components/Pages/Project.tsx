import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { getOneProjThunk } from '../../features/redux/seachProjects/seachProjThunk';
import OneProjectCard from './OneProjectCard';

export default function Project(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOneProjThunk(Number(id)));
  }, []);
  const project = useAppSelector((store) => store.postsProjects.postsProjects);

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
