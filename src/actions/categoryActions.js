import { fetchAsync } from '../util/fetchAsync';
import * as types from '../constants/actionTypes';

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    const { categories } = await fetchAsync('http://localhost:3001/categories');

    dispatch({
      type: types.SET_CATEGORIES,
      payload: {
        categories
      }
    });
  };
};
