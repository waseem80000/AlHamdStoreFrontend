import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.isLoading, action) => {
  switch (action.type) {
    case actionTypes.startLoading: {
      return (state = true);
    }
    case actionTypes.stopLoading: {
      return (state = false);
    }
    default:
      return state;
  }
};
