import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './features/redux/store';
import { Provider } from 'react-redux';

axios.defaults.baseURL = 'http://localhost:3001/';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
