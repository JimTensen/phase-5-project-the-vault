import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SIGNUP_SUCCESS } from './types';

export const login = (credentials) => (dispatch) => {
  fetch('http://localhost:5555/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: data.error,
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      console.log('Error logging in:', error);
      dispatch({
        type: LOGIN_FAILURE,
        payload: 'An error occurred while logging in.',
      });
    });
};

export const logout = () => (dispatch) => {
  fetch('http://localhost:5555/logout', {
    method: 'DELETE',
  })
    .then(() => {
      dispatch({ type: LOGOUT });
    })
    .catch((error) => {
      console.log('Error logging out:', error);
    });
};

export const signup = (username, password) => (dispatch) => {
  fetch('http://localhost:5555/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: data.error,
        });
      } else {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      console.log('Error signing up:', error);
      dispatch({
        type: LOGIN_FAILURE,
        payload: 'An error occurred while signing up.',
      });
    });
};