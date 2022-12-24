import instance from './request';

export function createVendor(data) {
  return instance.post('/vendors', data);
}

export function getVendors() {
  return instance.get('/vendors');
}

export function deleteVendor(id) {
  return instance.delete(`/vendors/${id}`);
}

export function updateVendor(id, data) {
  return instance.patch(`/vendors/${id}`, data);
}
