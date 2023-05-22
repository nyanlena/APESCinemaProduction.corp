import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainPage from './components/Pages/MainPage';
import Navbar from './components/Ui/Navbar';
import Footer from './components/Ui/Footer';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import ChooseRole from './components/Pages/ChooseRole';
import Profile from './components/Pages/Profile';
import SearchProfiles from './components/Pages/SearchProfiles';
import SeachProjects from './components/Pages/SeachProjects';
import Favorites from './components/Pages/Favorites';
import Project from './components/Pages/Project';
import Orders from './components/Pages/Orders';
// import Loader from './HOC/Loader';

function App(): JSX.Element {
  return (
    <Container>
      {/* <Loader > */}
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/role" element={<ChooseRole />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* <Route path="/profile/:setting" element={<Profile />} /> */}
          <Route path="/search/profiles" element={<SearchProfiles />} />
          <Route path="/seach/projects" element={<SeachProjects />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
      </>
      {/* </Loader> */}
    </Container>
  );
}

export default App;
