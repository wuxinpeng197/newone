import * as types from './actionTypes';
import axios from 'axios';

/**
 * set user data
 * @param user
 * @returns {{type: string, data: *}}
 */
export const setUser = user => ({
  type: types.SET_USER,
  data: user
});

/**
 * set loading user status
 * @param loading
 * @returns {{type: string, data: *}}
 */
export const setUserLoading = loading => ({
  type: types.SET_USER_LOADING,
  data: loading
});

/**
 * fetch user from server, and set data & loading status
 * @returns {Function}
 */
export const fetchUser = () => dispatch => {
  dispatch(setUserLoading(true));
  axios.post('/api/auth/current')
    .then(res => {
      const user = res.data;
      if (user) {
        dispatch(setUser(user));
      }
      dispatch(setUserLoading(false));
    });
};
