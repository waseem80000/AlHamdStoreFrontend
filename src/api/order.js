import instance from './request';

export function getOrders(data, filter) {
  return instance.get(`/order?page=${filter.page}&&per_page=${filter.perPage}`, {
    params: data,
  });
}

export function getOrder(id) {
  return instance.get(`/order/${id}`);
}

export function getOnHoldOrders() {
  return instance.get(`/order/onHold`);
}

export function createOrder(data) {
  return instance.post('/order', data);
}

export function updateOrder(data, id) {
  return instance.patch(`/order/${id}`, data);
}

export function deleteOrder(id) {
  return instance.delete(`/order/${id}`);
}

