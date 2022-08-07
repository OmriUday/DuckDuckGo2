import * as actionTypes from '../actions/actionTypes';

const fetchDataReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_START:
      return {
        ...state,
        data: action.loading,
      };
    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case actionTypes.FETCH_DATA_FAILED:
      return {
        ...state,
        error: action.error,
      };

    default:
      return { state };
  }
};

export default fetchDataReducer;
