import { toast } from 'react-toastify';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../api/category';
import { actionTypes } from '../constants/actionTypes';

const createCategoryAction = (payload) => {
  return {
    type: actionTypes.createCategory,
    payload,
  };
};

const updateCategoryAction = (payload) => {
  return {
    type: actionTypes.updateCategory,
    payload,
  };
};

const deleteCategoryAction = (payload) => {
  return {
    type: actionTypes.deleteCategory,
    payload,
  };
};

const getCategoriesAction = (payload) => {
  return {
    type: actionTypes.getCategories,
    payload,
  };
};

export const CreateCategory = (data) => async (dispatch) => {
  const res = await createCategory(data);
  if (res.status === 200) {
    dispatch(createCategoryAction(res.data));
    toast.success('Category Created Successfully');
  }
};

export const GetCategories = () => async (dispatch) => {
  const res = await getCategories();
  if (res.status === 200) {
    dispatch(getCategoriesAction(res?.data));
  }
};

export const DeleteCategory = (id) => async (dispatch) => {
  const res = await deleteCategory(id);
  if (res.status === 200) {
    const categories = await getCategories();
    dispatch(deleteCategoryAction(categories.data));
    toast.success('Category Deleted Successfully');
  }
};

export const UpdateCategory = (id, data) => async (dispatch) => {
  const res = await updateCategory(id, data);
  if (res.status === 200) {
    dispatch(updateCategoryAction(res.data));
    toast.success('Category Updated Successfully');
  }
};
