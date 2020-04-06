/* eslint-disable no-undef */
import axios from 'axios';

axios.defaults.baseURL = 'https://coronacharts.herokuapp.com/api/v1';
axios.defaults.headers.common['authsecret'] = process.env.REACT_APP_AUTH_SECRET;
