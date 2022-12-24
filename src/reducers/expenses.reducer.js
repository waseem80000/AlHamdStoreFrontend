import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.expenses, action) => {
  switch (action.type) {
    case actionTypes.getExpenses: {
      const { expenses, currentPage, totalPages, noOfExpenses, totalExpense, expenseStats } = action.payload;
      return { ...state, expenses, currentPage, totalPages, noOfExpenses, totalExpense, expenseStats };
    }
    case actionTypes.createExpense: {
      return { ...state, expenses: state.expenses.concat(action.payload) };
    }
    case actionTypes.updateExpense: {
      return { ...state, expenses: state.expenses.map((e) => (e._id === action.payload._id ? action.payload : e)) };
    }
    case actionTypes.deleteExpense: {
      const { expenses, currentPage, totalPages, noOfExpenses, totalExpense, expenseStats } = action.payload;

      return { ...state, expenses, currentPage, totalPages, noOfExpenses, totalExpense, expenseStats };
    }
    default:
      return state;
  }
};
