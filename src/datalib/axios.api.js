import axios from 'axios';
import {SERVER_URL} from '@env';
/*
 * Here we are creating instance of non-secure APIs
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const api = axios.create({
  baseURL: SERVER_URL,
});

api.interceptors.response.use(response => response.data);

export default api;
