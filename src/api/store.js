import instance from './request';

export function createStore(data) {
  return instance.post('/store', data);
}

export function getStores() {
  return instance.get('/store');
}

export function updateStore(id, data) {
  return instance.patch(`/store/${id}`, data);
}

export function deleteStore(id) {
  return instance.delete(`/store/${id}`);
}
