import axios from 'axios';
import { API_URL } from './constants';
import UserService from './UserService';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 3000,
});

// Headers
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Authorization'] = UserService.getToken();


// export (getProgress, instance);
export default instance;
