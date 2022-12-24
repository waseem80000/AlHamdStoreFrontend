import instance from './request';

export function loginRequest(data) {
  return instance.post(`/user/sign_in`, data);
}
