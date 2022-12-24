import instance from './request';

export function getProducts(data) {
  return instance.get(
    `/products?page=${data.page}&&category_id=${data.category_id}&&search_keyword=${data.keyword}&&per_page=${data.per_page}`
  );
}

export function getAllProducts() {
  return instance.get(`/products/all`);
}

export function getProduct(id) {
  return instance.get(`/api/products/${id}`);
}

export function getProductsStats(data) {
  return instance.get(
    `/productsStats?search_keyword=${data.keyword}&&page=${data.page}&&per_page=${data.perPage}&&store=${data.store}`
  );
}

export function createProduct(data) {
  return instance.post('/products', data);
}

export function deleteProduct(id) {
  return instance.delete(`/products/${id}`);
}

export function updateProduct(id, body) {
  return instance.patch(`/products/${id}`, body);
}
