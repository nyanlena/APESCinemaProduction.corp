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
import SerachProjects from './components/Pages/SerachProjects';
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
          <Route path="/chooserole" element={<ChooseRole />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/searchprofiles" element={<SearchProfiles />} />
          <Route path="/searchprojects" element={<SerachProjects />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/project" element={<Project />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
      </>
      {/* </Loader> */}
    </Container>
  );
}

export default App;
