import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.customers, action) => {
  switch (action.type) {
    case actionTypes.getCustomers: {
      return { ...state, allCustomers: action.payload };
    }
    case actionTypes.currentCustomer: {
      return { ...state, currentCustomer: action.payload };
    }
    case actionTypes.createCustomer: {
      return { ...state, allCustomers: state.allCustomers.concat(action.payload), currentCustomer: action.payload };
    }
    case actionTypes.deleteCustomer: {
      return { ...state, allCustomers: action.payload };
    }
    case actionTypes.updateCustomer: {
      return { ...state, allCustomers: state.allCustomers.map((e) => (e._id === action.payload._id ? action.payload : e)) };
    }
    default:
      return state;
  }
};
