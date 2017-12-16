import { fetchAsync } from '../util/fetchAsync';
import * as types from '../constants/actionTypes';
import uuidv4 from 'uuid/v4';

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

export const fetchPostsByCategory = category => {
  return async (dispatch, getState) => {
    const posts = await fetchAsync(`http://localhost:3001/${category}/posts`);

    dispatch({
      type: types.SET_POSTS,
      payload: {
        posts
      }
    });
  };
};

export const createPost = postParams => {
  return async dispatch => {
    const newPost = await fetchAsync('http://localhost:3001/posts', {
      method: 'POST',
      body: JSON.stringify({
        ...postParams,
        timestamp: Date.now(),
        id: uuidv4()
      })
    });

    dispatch({
      type: types.CREATE_POST,
      payload: {
        post: newPost
      }
    });
  };
};
