import React from 'react';
import { Layout, Menu, theme, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export default function Navbar(): JSX.Element {
  const { Header } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logoItem = {
    key: 'welcome',
    label: 'logo',
    path: '/',
    logoSrc: '/monkeyWithRice.jpg',
  };

  const mainMenuItems = [
    { key: 'portfolio', label: 'Портфолио', path: '/profile/:id' },
    { key: 'search', label: 'Поиск', path: '/search/profiles' },
    { key: 'favorites', label: 'Избранное', path: '/favorites' },
    { key: 'projects', label: 'Проекты', path: '/seach/projects' },
    { key: 'register', label: 'Регистрация', path: '/signup' },
    { key: 'login', label: 'Войти', path: '/login' },
    { key: 'requests', label: 'Заявки', path: '/orders' },
  ];

  const logoutItem = { key: 'logout', label: 'Выйти', path: '/logout' };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to={logoItem.path}>
          <img
            src={logoItem.logoSrc}
            alt={logoItem.label}
            className="demo-logo"
            style={{ width: '50px', borderRadius: '50%', border: '1px solid white' }}
          />
        </Link>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {mainMenuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.path} style={{ textDecoration: 'none' }}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        <Menu theme="dark" mode="horizontal">
          {/* <Menu.Item>
                <Link to="/profile/1" style={{ textDecoration: 'none' }}>
                  Мой профиль
                </Link>
          </Menu.Item> */}
          <Menu.Item key={logoutItem.key}>
            <Link to={logoutItem.path} style={{ textDecoration: 'none' }}>
              {logoutItem.label}
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}
