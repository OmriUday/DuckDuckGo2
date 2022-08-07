import * as actionTypes from './actionTypes';

export const fetchDataAction = ({ searchText, limit, offset }) => {
  return async (dispatch) => {
    if (!offset && offset !== 0) {
      return;
    }

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/${searchText}/?limit=${limit}&offset=${offset}`,
      );
      if (!response.ok) {
        throw new Error('Could not fetch data!');
      }
      const data = await response.json();

      return data;
    };

    try {
      const data = await fetchData();
      dispatch(fetchDataSuccess(data));
    } catch (err) {
      console.log('Error fethcing data! ' + err);
      dispatch(fetchDataFailed(err));
    }
  };
};

const fetchDataStart = (loading) => {
  return {
    type: actionTypes.FETCH_DATA_START,
    loading,
  };
};

const fetchDataSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    data,
  };
};

const fetchDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_DATA_FAILED,
    error,
  };
};
