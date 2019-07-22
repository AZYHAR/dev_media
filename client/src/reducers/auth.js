import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import { stat } from 'fs';

const initialState = {
  token: localStorage.getItem('token'),
  // When user will login reducer
  // will change state to true
  // false to logout
  isAuthenticated: null,
  // To make sure that loading is done
  // during loading the user
  // when loaded will be set to false
  loading: true,
  // user data
  user: null
};

export default function(state = initialState, action) {
  // Destructuring
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      // Update local storage token
      // for user access
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        // User logged in
        isAuthenticated: true,
        // Loading from database
        // done
        loading: false
      };
    case REGISTER_FAIL:
      // Remove token
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
