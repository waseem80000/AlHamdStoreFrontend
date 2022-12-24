import instance from './request';

export function createCategory(data) {
  return instance.post('/categories', data);
}

export function getCategories() {
  return instance.get('/categories');
}

export function updateCategory(id, data) {
  return instance.patch(`/categories/${id}`, data);
}

export function deleteCategory(id) {
  return instance.delete(`/categories/${id}`);
}
