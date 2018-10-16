import * as types from '../actionTypes';

const initialState = {
  user: null,
  loading: false
};

/**
 * user reducer
 * @param state
 * @param action
 * @returns {{user: null, loading: boolean}}
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_USER: {
      return {
        ...state,
        user: action.data
      };
    }
    case types.SET_USER_LOADING: {
      return {
        ...state,
        loading: action.data
      };
    }
    default:
      return state;
  }
}
