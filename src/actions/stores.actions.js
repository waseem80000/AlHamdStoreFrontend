import { toast } from 'react-toastify';
import { createStore, deleteStore, getStores, updateStore } from '../api/store';
import { actionTypes } from '../constants/actionTypes';

const createStoreAction = (payload) => {
  return {
    type: actionTypes.createStore,
    payload,
  };
};

const updateStoreAction = (payload) => {
  return {
    type: actionTypes.updateStore,
    payload,
  };
};

const deleteStoreAction = (payload) => {
  return {
    type: actionTypes.deleteStore,
    payload,
  };
};

const getStoresAction = (payload) => {
  return {
    type: actionTypes.getStores,
    payload,
  };
};

export const CreateStore = (data) => async (dispatch) => {
  const res = await createStore(data);
  if (res.status === 200) {
    dispatch(createStoreAction(res.data));
    toast.success('Store Created Successfully');
  }
};

export const GetStores = (data) => async (dispatch) => {
  const res = await getStores(data);
  if (res.status === 200) {
    dispatch(getStoresAction(res.data));
  }
};

export const DeleteStore = (id) => async (dispatch) => {
  const res = await deleteStore(id);
  if (res.status === 200) {
    const stores = await getStores();
    dispatch(deleteStoreAction(stores.data));
    toast.success('Store Deleted Successfully');
  }
};

export const UpdateStore = (id, data) => async (dispatch) => {
  const res = await updateStore(id, data);
  if (res.status === 200) {
    dispatch(updateStoreAction(res.data));
    toast.success('Store Updated Successfully');
  }
};
