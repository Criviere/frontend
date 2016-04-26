import { checkHttpStatus, parseJSON } from './utils';
import * as jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch';

import env from './env';

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: 'LOGIN_USER_SUCCESS',
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: 'LOGIN_USER_FAILURE',
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: 'LOGIN_USER_REQUEST'
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: 'LOGOUT_USER'
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
    }
}

export function loginUser(username, password, redirect="/home") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch(`${env}/api/v1/login`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess(response.token));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}

export function receiveCurCourses(data) {
    return {
        type: 'GET_CUR_COURSES',
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: 'FETCH_PROTECTED_DATA_REQUEST'
  }
}

export function fetchCurCourses(token) {

    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return fetch(`${env}/api/v1/auth/courses/present`, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveCurCourses(response.data));
            })
            .catch(error => {
                if(error.response.status === 401) {
                  dispatch(loginUserFailure(error));
                }
            })
       }
}
