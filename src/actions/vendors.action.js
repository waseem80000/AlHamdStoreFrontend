import { toast } from 'react-toastify';
import { createVendor, deleteVendor, getVendors, updateVendor } from '../api/vendors';
import { actionTypes } from '../constants/actionTypes';

const createVendorAction = (payload) => {
  return {
    type: actionTypes.createVendor,
    payload,
  };
};

const getVendorsAction = (payload) => {
  return {
    type: actionTypes.getVendors,
    payload,
  };
};

const deleteVendorAction = (payload) => {
  return {
    type: actionTypes.deleteVendor,
    payload,
  };
};

const updateVendorAction = (payload) => {
  return {
    type: actionTypes.updateVendor,
    payload,
  };
};

export const CreateVendor = (data) => async (dispatch) => {
  const res = await createVendor(data);
  if (res.status === 200) {
    dispatch(createVendorAction(res.data));
    toast.success('Vendor Created Successfully');
  }
};

export const GetVendors = () => async (dispatch) => {
  const res = await getVendors();
  if (res.status === 200) {
    dispatch(getVendorsAction(res.data));
  }
};

export const DeleteVendor = (id) => async (dispatch) => {
  const res = await deleteVendor(id);
  if (res.status === 200) {
    const vendors = await getVendors();
    dispatch(deleteVendorAction(vendors.data));
    toast.success('Vendor Deleted Successfully');
  }
};

export const UpdateVendor = (id, data) => async (dispatch) => {
  const res = await updateVendor(id, data);
  if (res.status === 200) {
    dispatch(updateVendorAction(res.data));
    toast.success('Vendor Updated Successfully');
  }
};
