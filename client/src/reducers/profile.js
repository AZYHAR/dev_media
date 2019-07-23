import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS
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
        profiles: [],
        repos: [],
        loading: false,
        error: {}
      };
    case GET_PROFILES:
      return {
        ...state,
        profile: null,
        profiles: payload,
        repos: [],
        loading: false,
        error: {}
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
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
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    default:
      return state;
  }
}
