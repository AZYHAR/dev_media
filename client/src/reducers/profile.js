import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {}
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        profiles: [],
        repos: [],
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        profile: null,
        profiles: [],
        repos: [],
        loading: false,
        error: {}
      };
    default:
      return state;
  }
}
