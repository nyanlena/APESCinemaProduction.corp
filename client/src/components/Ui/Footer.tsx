import { Layout } from 'antd';
import React from 'react';

export default function Footer(): JSX.Element {
  return (
    <Layout.Footer
      style={{
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      APES ©2023 Created by APES Cinema Production Corp
    </Layout.Footer>
  );
}
