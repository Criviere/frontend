import {createReducer} from '../utils';

const initialState = {
    data: null,
    isFetching: false
};

export default createReducer(initialState, {
    'RECEIVE_PROTECTED_DATA': (state, payload) => {
        return Object.assign({}, state, {
            'data': payload.data,
            'isFetching': false
        });
    },
    'FETCH_PROTECTED_DATA_REQUEST': (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    },
    'GET_CUR_COURSES': (state, payload) => {
      return Object.assign({}, state, {
        'curCourses': payload.data
      });
    },
    'GET_ALL_COURSES': (state, payload) => {
      return Object.assign({}, state, {
        'allCourses': payload.data
      });
    }
});
