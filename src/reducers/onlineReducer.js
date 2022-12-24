import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.online, action) => {
  switch (action.type) {
    case actionTypes.setOnline: {
      return { ...state, onlineStatus: true };
    }
    case actionTypes.setOffline: {
      return { ...state, onlineStatus: false };
    }
    default:
      return state;
  }
};
