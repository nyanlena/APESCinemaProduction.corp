import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainPage from './components/Pages/MainPage';
import Navbar from './components/Ui/Navbar';
import Footer from './components/Ui/Footer';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import ChooseRole from './components/Pages/ChooseRole';
import ProfilePage from './components/Pages/ProfilePage';
import SearchProfiles from './components/Pages/SearchProfiles';
import Favorites from './components/Pages/Favorites';
import Project from './components/Pages/Project';
import Orders from './components/Pages/Orders';
import SettingPage from './components/Pages/SettingPage';
import { useAppDispatch, useAppSelector } from './features/redux/store';
import { checkUserThunk } from './features/redux/user/thunkActions';
import PrivateRouter from './HOC/PrivateRouter';
import Loader from './HOC/Loader';
import SeachProjects from './components/Pages/SeachProjects';
import { wsInitAction } from './features/redux/wsActions';
import ImagePage from './components/Pages/ImagePage';
import EmailForgotPassword from './components/Pages/EmailForgotPassword';
import NewPassword from './components/Pages/NewPassword';

function App(): JSX.Element {
  const location = useLocation();
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserThunk());
  }, []);

  useEffect(() => {
    if (user.status === 'logged') {
      dispatch(wsInitAction());
    }
  }, [user]);

  return (
    <Container>
      <Loader>
        <>
          {!(
            // location.pathname === '/' ||
            (
              user.status === 'guest' ||
              location.pathname === '/signup' ||
              location.pathname === '/signup/role'
            )
          ) && <Navbar />}
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route element={<PrivateRouter isAllowed={user.status === 'guest'} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login/forget" element={<EmailForgotPassword />} />
              <Route path="/login/forget/:uuid" element={<NewPassword />} />
            </Route>
            <Route path="/signup/role" element={<ChooseRole />} />
            <Route element={<PrivateRouter isAllowed={user.status === 'logged'} />}>
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/profile/setting" element={<SettingPage />} />
              <Route path="/profile/image" element={<ImagePage />} />
              <Route path="/search/profiles" element={<SearchProfiles />} />
              <Route path="/seach/projects" element={<SeachProjects />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
          </Routes>
          <Footer />
        </>
      </Loader>
    </Container>
  );
}

export default App;
