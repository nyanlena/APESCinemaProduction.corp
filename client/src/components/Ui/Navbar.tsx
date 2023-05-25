import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { logoutThunk } from '../../features/redux/user/thunkActions';

export default function Navbar(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const { profiles } = useAppSelector((store) => store.profiles);

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
            <Menu.Item>
              <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none' }}>
                Портфолио
              </Link>
            </Menu.Item>
            {user.status === 'logged' && user.statusId !== 1 ? (
              <>
                <Menu.Item>
                  <Link to="/search/profiles" style={{ textDecoration: 'none' }}>
                    Поиск
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/favorites" style={{ textDecoration: 'none' }}>
                    Избранное
                  </Link>
                </Menu.Item>
              </>
            ) : (
              ''
            )}
            <Menu.Item>
              <Link to="/seach/projects" style={{ textDecoration: 'none' }}>
                Проекты
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/orders" style={{ textDecoration: 'none' }}>
                Заявки
              </Link>
            </Menu.Item>
          </Menu>
        )}

        {user.status === 'guest' && (
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                Регистрация
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Авторизация
              </Link>
            </Menu.Item>
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
