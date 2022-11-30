/* eslint-disable prefer-promise-reject-errors */
import Axios from 'axios';
import crudApi from './crudApi';
import shopApi from './shopApi';
import customerApi from './customerApi';
import orderApi from './orderApi';
import settingsApi from './settingsApi';
import commonApi from './commonApi';
import cmsApi from './cmsApi';
import appointmentApi from './appointmentApi';
import chatApi from './chatApi';

const baseURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
// const baseURL = 'http://localhost:4000';

const service = Axios.create({
  baseURL,
  headers: {
    Authorization: '',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem('caratell-token');
  const refresh = localStorage.getItem('refresh');
  if (token) {
    config.headers.Authorization = token;
  } else if (refresh) {
    config.headers.Authorization = refresh;
  }
  return config;
});

function errorHandler(error, url) {
  return new Promise((resolve, reject) => {
    if (error.response && error.response.status === 401 && url !== '/admin-login') {
      localStorage.removeItem('caratell-token');
      localStorage.removeItem('refresh');
      window.location.href = '/login';
      reject("You aren't logged in");
    }
    if (error && error.response && error.response.data) {
      console.log(`Error in ${url}`, error.response.data);
      reject(error.response.data);
    } else {
      console.log(`Error in ${url}`, error);
      reject(error);
    }
  });
}

const apiService = {
  ...crudApi(service, errorHandler),
  ...commonApi(service, errorHandler),
  ...shopApi(service, errorHandler),
  ...customerApi(service, errorHandler),
  ...orderApi(service, errorHandler),
  ...settingsApi(service, errorHandler),
  ...cmsApi(service, errorHandler),
  ...appointmentApi(service, errorHandler),
  ...chatApi(service, errorHandler),
};

export default apiService;
