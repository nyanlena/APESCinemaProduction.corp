import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainPage from './components/Pages/MainPage';
// import Loader from './HOC/Loader';

function App(): JSX.Element {
  return (
    <Container>
      {/* <Loader > */}
      <>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </>
      {/* </Loader> */}
    </Container>
  );
}

export default App;
