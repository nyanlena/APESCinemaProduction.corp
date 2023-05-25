import React from 'react';

import { Spinner } from 'reactstrap';

import { useAppSelector } from '../features/redux/store';

type LoaderType = {
  children: JSX.Element;
};
export default function Loader({ children }: LoaderType): JSX.Element {
  const user = useAppSelector((store) => store.user);
  if (user.status !== 'fetching') return children;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Высота на весь экран (можете использовать другую высоту по вашему выбору)
      }}
    >
      <Spinner animation="border" variant="danger" />
      <span>Loading...</span>
    </div>
  );
}
