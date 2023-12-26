import axios from 'axios';
import {BASE_URL} from '../Constants/APIContants/BASE_URL';
import {getToken} from './secureStorage';
import showToast from '../Components/ModelComponent';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async config => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common.Authorization;
    }
    return config;
  },

  error => Promise.reject(error),
);

// Response interceptor for handling network errors
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        showToast(error?.message);
        console.log(error, 'error');
        // Handle Unauthorized (e.g., log out the user)
      } else if (error.response.status === 404) {
        showToast(error?.message);
        console.log(error, 'error');
        // Handle Not Found (e.g., show a 404 page)
      } else {
        showToast(error?.message);
        // Handle other error status codes
      }
    } else if (error.request) {
      // The request was made, but no response was received (e.g., network error)
      // You can handle network errors here
      console.error('Network error:', error.message);
      showToast(error?.message);
      // console.log(error, 'error');
    } else {
      showToast(error?.message);
      // Something else happened in making the request
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default API;
