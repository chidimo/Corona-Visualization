/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import * as Sentry from '@sentry/browser';
import 'react-toastify/dist/ReactToastify.css';

import store from './store';
import { Routes } from './Routes';

import './App.scss';
import './plot-styles.scss';
import './react-toastify-styles.scss';

// eslint-disable-next-line no-undef
process.env.NODE_ENV === 'production' &&
  Sentry.init({
    dsn: 'https://cfb32132996b43baad8022e6bf6e07eb@sentry.io/1824714',
  });

axios.defaults.baseURL =
  // eslint-disable-next-line no-undef
  process.env.REACT_APP_BASE_URL || 'https://coronacharts.herokuapp.com/api/v1';

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
      />
      <Routes />
    </Provider>
  );
};

export default App;