import { toast } from 'react-toastify';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProducts,
  getProductsStats,
  updateProduct,
} from '../api/products';
import { actionTypes } from '../constants/actionTypes';

const getProductsAction = (payload) => {
  return {
    type: actionTypes.getProducts,
    payload,
  };
};

const getAllProductsAction = (payload) => {
  return {
    type: actionTypes.getAllProduct,
    payload,
  };
};

const getProductsStatsAction = (payload) => {
  return {
    type: actionTypes.getProductsStats,
    payload,
  };
};

const getProductAction = (payload) => {
  return {
    type: actionTypes.getProduct,
    payload,
  };
};

const createProductAction = (payload) => {
  return {
    type: actionTypes.createProduct,
    payload,
  };
};

const editProductAction = (payload) => {
  return {
    type: actionTypes.editProduct,
    payload,
  };
};

export const filterProductsAction = (payload) => {
  return {
    type: actionTypes.filterProducts,
    payload,
  };
};

export const filterProductsStatsAction = (payload) => {
  return {
    type: actionTypes.filterStats,
    payload,
  };
};

export const updateProductsQuantityAction = (payload) => {
  return {
    type: actionTypes.updateProductsQuantity,
    payload,
  };
};

export const GetProducts = (data) => async (dispatch) => {
  const res = await getProducts(data);
  if (res.status === 200) {
    dispatch(getProductsAction(res?.data));
  }
};

export const GetProductsStats = (data) => async (dispatch) => {
  const res = await getProductsStats(data);
  if (res.status === 200) {
    dispatch(getProductsStatsAction(res.data));
  }
};

export const GetProduct = (id) => async (dispatch) => {
  const res = await getProduct(id);
  if (res.status === 200) {
    dispatch(getProductAction(res.data));
  }
};

export const GetAllProducts = (data) => async (dispatch) => {
  const res = await getAllProducts(data);
  if (res.status === 200) {
    dispatch(getAllProductsAction(res.data));
  }

  return res;
};

export const CreateProduct = (data) => async (dispatch) => {
  const res = await createProduct(data);
  if (res.status === 201) {
    dispatch(createProductAction(res.data));
    toast.success('Product Created Successfully');
  }
  return res;
};

export const DeleteProduct = (id) => async (dispatch) => {
  const res = await deleteProduct(id);
  if (res.status === 204) {
    toast.success('Product Deleted Successfully');
  }
  return res;
};

export const EditProduct = (id, data) => async (dispatch) => {
  const res = await updateProduct(id, data);
  if (res.status === 200) {
    dispatch(editProductAction(res.data));
    toast.success('Product Updated Successfully');
  }
  return res;
};
