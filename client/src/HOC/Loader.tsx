import React from 'react';
import { Space, Spin } from 'antd';
import { useAppSelector } from '../features/redux/store';

type LoaderType = {
  children: JSX.Element;
};
export default function Loader({ children }: LoaderType): JSX.Element {
  const user = useAppSelector((store) => store.user);
  if (user.status !== 'fetching') return children;
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Spin tip="Loading" size="large">
          <div
            style={{ padding: '50px', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: '4px' }}
          />
        </Spin>
      </Space>
    </Space>
  );
}
