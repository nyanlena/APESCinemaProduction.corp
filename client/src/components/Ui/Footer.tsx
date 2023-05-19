import { Layout } from 'antd';
import React from 'react';

export default function Footer(): JSX.Element {
  const { Footer } = Layout;
  return (
    <Layout>
      <Footer style={{ textAlign: 'center' }}>
        APES ©2023 Created by APES Cinema Production Corp
      </Footer>
    </Layout>
  );
}
