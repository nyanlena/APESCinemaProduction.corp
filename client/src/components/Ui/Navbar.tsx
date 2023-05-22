import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { logoutThunk } from '../../features/redux/user/thunkActions';

export default function Navbar(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

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
    { key: 'projects', label: 'Проекты', path: '/projects' },
    { key: 'requests', label: 'Заявки', path: '/orders' },
  ];

  const authMenuItems = [
    { key: 'register', label: 'Регистрация', path: '/signup' },
    { key: 'login', label: 'Войти', path: '/login' },
  ];

  const logoutItem = { key: 'logout', label: 'Выйти', path: '/' };

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

        {user.status === 'logged' && (
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {mainMenuItems.map((item) => (
              <Menu.Item key={item.key}>
                <Link to={item.path} style={{ textDecoration: 'none' }}>
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        )}

        {user.status === 'guest' && (
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {authMenuItems.map((item) => (
              <Menu.Item key={item.key}>
                <Link to={item.path} style={{ textDecoration: 'none' }}>
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        )}

        {user.status === 'logged' && (
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key={logoutItem.key}>
              <Link
                onClick={() => dispatch(logoutThunk())}
                to={logoutItem.path}
                style={{ textDecoration: 'none' }}
              >
                {logoutItem.label}
              </Link>
            </Menu.Item>
          </Menu>
        )}
      </Header>
    </Layout>
  );
}
