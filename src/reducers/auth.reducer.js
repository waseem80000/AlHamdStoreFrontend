import { actionTypes } from '../constants/actionTypes';
import initialState from './initialState';

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case actionTypes.login: {
      return { ...state, isSignedIn: true };
    }
    case actionTypes.logout: {
      return { ...state, isSignedIn: false };
    }
    default:
      return state;
  }
};
