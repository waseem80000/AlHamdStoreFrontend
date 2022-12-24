import { toast } from 'react-toastify';
import { loginRequest } from '../api/auth';
import { actionTypes } from '../constants/actionTypes';

export const loginAction = () => {
  return {
    type: actionTypes.login,
  };
};

const logoutAction = () => {
  return {
    type: actionTypes.logout,
  };
};

export const LoginRequest = (data, navigate) => async (dispatch) => {
  const res = await loginRequest(data);
  if (res.status === 200) {
    window.location.href = '/';
    const token = res.data['token'];
    const user = res.data['result'];
    toast.success('LoggedIn Successfully');
    dispatch(loginAction());
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const LogoutRequest = () => async (dispatch) => {
  window.location.href = '/login';
  dispatch(logoutAction());
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('persist:app');
  localStorage.removeItem('orders');
};
