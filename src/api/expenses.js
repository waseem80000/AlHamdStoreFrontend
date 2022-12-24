import instance from './request';

export function createExpense(data) {
  return instance.post(`/expenses`, data);
}

export function getExpenses(data, filter) {
  return instance.get(`/expenses?page=${filter.page}&&per_page=${filter.perPage}`, { params: data });
}

export function updateExpense(id, data) {
  return instance.patch(`/expenses/${id}`, data);
}

export function deleteExpense(id) {
  return instance.delete(`/expenses/${id}`);
}
