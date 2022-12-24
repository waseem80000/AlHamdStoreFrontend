import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';
import { store } from '../config/store';
import { loginAction, LogoutRequest } from '../actions/auth.actions';
import { toast } from 'react-toastify';
import { actionTypes } from '../constants/actionTypes';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  req.headers.Accept = 'application/json';
  req.headers['authorization'] = token;
  req.headers['Content-Type'] = 'application/json';
  store.dispatch({ type: actionTypes.startLoading });

  return req;
});

instance.interceptors.response.use(
  (res) => {
    store.dispatch(loginAction());
    store.dispatch({ type: actionTypes.stopLoading });
    return res;
  },
  (error) => {
    if (!error.request?.responseURL?.includes('sign_in') && error.toString().includes(401)) {
      store.dispatch(LogoutRequest());
    }
    store.dispatch({ type: actionTypes.stopLoading });
    toast.error(error.response?.data.message);
    return Promise.reject(error.response?.data);
  }
);

export default instance;
