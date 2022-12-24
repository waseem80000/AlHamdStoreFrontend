import { actionTypes } from '../constants/actionTypes';
import { createOrder, deleteOrder, getOnHoldOrders, getOrder, getOrders, updateOrder } from '../api/order';
import { toast } from 'react-toastify';

export const createOrderAction = (status, payload) => {
  return {
    type: actionTypes.createOrder,
    payload,
    status,
  };
};

export const updateOrderAction = (payload) => {
  return {
    type: actionTypes.updateOrder,
    payload,
  };
};

export const updateOrderPrice = (payload) => {
  return {
    type: actionTypes.updatePrice,
    payload,
  };
};

const getOrdersAction = (payload) => {
  return {
    type: actionTypes.getOrders,
    payload,
  };
};

export const getOrderAction = (payload) => {
  return {
    type: actionTypes.getOrder,
    payload,
  };
};

export const deleteOrderItemAction = (payload) => {
  return {
    type: actionTypes.deleteOrderItem,
    payload,
  };
};

export const deleteCurrentOrderItemAction = (payload) => {
  return {
    type: actionTypes.deleteCurrentOrderItem,
    payload,
  };
};

export const deleteAllOrderItemsAction = () => {
  return {
    type: actionTypes.deleteAllOrderItems,
  };
};

export const updateOrderStatusAction = (payload) => {
  return {
    type: actionTypes.updateOrderStatus,
    payload,
  };
};

const confirmOrderAction = (payload) => {
  return {
    type: actionTypes.confirmOrder,
    payload,
  };
};

const getOnHoldOrdersAction = (payload) => {
  return {
    type: actionTypes.getOnHold,
    payload,
  };
};

export const editOnHoldAction = (payload) => {
  return {
    type: actionTypes.editOnHold,
    payload,
  };
};

export const ConfirmOrder = (data) => async (dispatch) => {
  const res = await createOrder(data);
  if (res.status === 201) {
    dispatch(confirmOrderAction(res.data));
    toast.success('Order Created Successfully');
  }
  return res;
};

export const GetOnHold = (data) => async (dispatch) => {
  const res = await getOnHoldOrders(data);
  if (res.status === 200) {
    dispatch(getOnHoldOrdersAction(res.data));
  }
  return res;
};

export const UpdateOrder = (data, id) => async (dispatch) => {
  const res = await updateOrder(data, id);
  if (res.status === 200) {
    dispatch(updateOrderAction(res.data));
    toast.success('Order Updated Successfully');
  }
  return res;
};

export const GetOrders = (data, filter) => async (dispatch) => {
  const res = await getOrders(data, filter);
  if (res.status === 200) {
    dispatch(getOrdersAction(res.data));
  }
  return res;
};

export const GetOrder = (id) => async (dispatch) => {
  const res = await getOrder(id);
  if (res.status === 200) {
    dispatch(getOrderAction(res.data));
  }
  return res;
};

export const DeleteOrder = (id) => async (dispatch) => {
  const res = await deleteOrder(id);
  if (res.status === 204) {
    toast.success('Order Deleted Successfully');
  }
  return res;
};
