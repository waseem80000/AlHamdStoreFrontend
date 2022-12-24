import { toast } from 'react-toastify';
import { createExpense, deleteExpense, getExpenses, updateExpense } from '../api/expenses';
import { actionTypes } from '../constants/actionTypes';

const createExpenseAction = (payload) => {
  return {
    type: actionTypes.createExpense,
    payload,
  };
};

const getExpensesAction = (payload) => {
  return {
    type: actionTypes.getExpenses,
    payload,
  };
};

const deleteExpenseAction = (payload) => {
  return {
    type: actionTypes.deleteExpense,
    payload,
  };
};

const updateExpenseAction = (payload) => {
  return {
    type: actionTypes.updateExpense,
    payload,
  };
};

export const CreateExpense = (data) => async (dispatch) => {
  const res = await createExpense(data);
  if (res.status === 200) {
    dispatch(createExpenseAction(res.data));
    toast.success('Expense Created Successfully');
  }
};

export const GetExpenses = (data, filter) => async (dispatch) => {
  const res = await getExpenses(data, filter);
  if (res.status === 200) {
    dispatch(getExpensesAction(res.data));
  }
};

export const DeleteExpenses = (id, data, filters) => async (dispatch) => {
  const res = await deleteExpense(id);
  if (res.status === 200) {
    const vendors = await getExpenses(data, filters);
    dispatch(deleteExpenseAction(vendors.data));
    toast.success('Expense Deleted Successfully');
  }
};

export const UpdateExpense = (id, data) => async (dispatch) => {
  const res = await updateExpense(id, data);
  if (res.status === 200) {
    dispatch(updateExpenseAction(res.data));
    toast.success('Expense Updated Successfully');
  }
};
