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
    <Spinner color="primary" type="grow">
      Loading...
    </Spinner>
  );
}
