/* eslint-disable no-param-reassign */
import axios from 'axios';
import sInfoUtil from '../utils/sInfo.util';
import ApiErrorEnum from './apiError.enum';
import AuthenticationApi from './services/authentication.api';
import {SERVER_URL} from '@env';
/*
 * This file return secure axios instance of axios
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const securedApi = axios.create({
  baseURL: SERVER_URL,
});

const setJwt = async config => {
  const jwt = await sInfoUtil.fetch('JWT');
  if (jwt) {
    // eslint-disable-next-line dot-notation
    config.headers['Authorization'] = `Bearer ${jwt}`;
    return Promise.resolve(config);
  }
  return Promise.reject();
};

securedApi.interceptors.request.use(
  config => setJwt(config),
  error => {
    Promise.reject(error);
  },
);

securedApi.interceptors.response.use(
  response => response.data,
  error => {
    const originalRequest = error.config;

    // TODO: Ideally should be 401, but spring security overrides on token expiry...not urgent
    if (error?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      return new AuthenticationApi()
        .refreshToken()
        .then(() => securedApi(originalRequest));
    }
    if (error.message === 'Network Error' && !error) {
      error.code = ApiErrorEnum.SERVER_UNREACHABLE;
    } else if (error?.status === 403 || error?.status === 401) {
      error.code = ApiErrorEnum.SECURITY_ERROR;
    } else if (error?.status === 404) {
      error.code = ApiErrorEnum.RESOURCE_NOT_FOUND_ERROR;
    } else {
      error.code = ApiErrorEnum.SERVER_ERROR;
    }
    return Promise.reject(error);
  },
);

export default securedApi;
