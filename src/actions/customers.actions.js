import { toast } from 'react-toastify';
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from '../api/customers';
import { actionTypes } from '../constants/actionTypes';

const createCustomerAction = (payload) => {
  return {
    type: actionTypes.createCustomer,
    payload,
  };
};

const getCustomersAction = (payload) => {
  return {
    type: actionTypes.getCustomers,
    payload,
  };
};

const deleteCustomerAction = (payload) => {
  return {
    type: actionTypes.deleteCustomer,
    payload,
  };
};

const updateCustomerAction = (payload) => {
  return {
    type: actionTypes.updateCustomer,
    payload,
  };
};

export const currentCustomerAction = (payload) => {
  return {
    type: actionTypes.currentCustomer,
    payload,
  };
};

export const CreateCustomer = (data) => async (dispatch) => {
  const res = await createCustomer(data);
  if (res.status === 201) {
    dispatch(createCustomerAction(res.data));
    toast.success('Customer Created Successfully');
  }
  return res;
};

export const GetCustomers = () => async (dispatch) => {
  const res = await getCustomers();
  if (res.status === 200) {
    dispatch(getCustomersAction(res.data));
  }
  return res;
};

export const DeleteCustomer = (id) => async (dispatch) => {
  const res = await deleteCustomer(id);
  if (res.status === 200) {
    const customers = await getCustomers();
    dispatch(deleteCustomerAction(customers.data));
    toast.success('Customer Deleted Successfully');
  }
};

export const UpdateCustomer = (id, data) => async (dispatch) => {
  const res = await updateCustomer(id, data);
  if (res.status === 200) {
    dispatch(updateCustomerAction(res.data));
    toast.success('Customer Updated Successfully');
  }
};
