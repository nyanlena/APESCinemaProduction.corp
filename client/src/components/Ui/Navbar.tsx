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
  const ws = useAppSelector((state) => state.ws);
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
        {ws.status ? (
          <span style={{ color: 'white' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-brightness-high"
              viewBox="0 0 16 16"
              color="green"
            >
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
            </svg>{' '}
            Online
          </span>
        ) : (
          <span style={{ color: 'white' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-brightness-high-fill"
              viewBox="0 0 16 16"
              color="red"
            >
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
            </svg>{' '}
            Ofline
          </span>
        )}
        {user.status === 'logged' && (
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item>
              <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none' }}>
                Портфолио
              </Link>
            </Menu.Item>
            {user.status === 'logged' && (
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
