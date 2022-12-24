import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.stores, action) => {
  switch (action.type) {
    case actionTypes.getStores: {
      return (state = action.payload);
    }
    case actionTypes.createStore: {
      return (state = state.concat(action.payload));
    }
    case actionTypes.updateStore: {
      return (state = state.map((e) => (e._id === action.payload._id ? action.payload : e)));
    }
    case actionTypes.deleteStore: {
      return (state = action.payload);
    }
    default:
      return state;
  }
};
