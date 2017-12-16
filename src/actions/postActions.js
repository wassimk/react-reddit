import { fetchAsync } from '../util/fetchAsync';
import * as types from '../constants/actionTypes';

export const fetchPosts = () => {
  return async (dispatch, getState) => {
    const posts = await fetchAsync('http://localhost:3001/posts');

    dispatch({
      type: types.SET_POSTS,
      payload: {
        posts
      }
    });
  };
};
