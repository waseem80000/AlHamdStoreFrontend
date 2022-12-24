import instance from './request';

export function createCustomer(data) {
  return instance.post('/customers', data);
}

export function getCustomers() {
  return instance.get('/customers');
}

export function deleteCustomer(id) {
  return instance.delete(`/customers/${id}`);
}

export function updateCustomer(id, data) {
  return instance.patch(`/customers/${id}`, data);
}
