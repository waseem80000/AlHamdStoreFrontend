import instance from './request';

export function createUser(data) {
  return instance.post('/user/add', data);
}

export function getUsers() {
  return instance.get('/user');
}

export function deleteUser(id) {
  return instance.delete(`/user/delete/${id}`);
}

export function updateUser(id, data) {
  return instance.put(`/user/update/${id}`, data);
}
