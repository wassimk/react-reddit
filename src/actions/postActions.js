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

export const fetchPost = id => {
  return async (dispatch, getState) => {
    const post = await fetchAsync(`http://localhost:3001/posts/${id}`);

    dispatch({
      type: types.SET_POST,
      payload: {
        post
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

    return newPost;
  };
};

export const deletePost = id => {
  return async (dispatch, getState) => {
    await fetchAsync(`http://localhost:3001/posts/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: types.DELETE_POST,
      payload: {
        id: id
      }
    });

    return new Promise(resolve => resolve());
  };
};

export const updatePost = post => {
  return async (dispatch, getState) => {
    const updatedPost = await fetchAsync(
      `http://localhost:3001/posts/${post.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(post)
      }
    );

    dispatch({
      type: types.UPDATE_POST,
      payload: {
        post: updatedPost
      }
    });

    return updatedPost;
  };
};

export const upVotePost = id => {
  return voteOnPost(id, 'upVote');
};

export const downVotePost = id => {
  return voteOnPost(id, 'downVote');
};

const voteOnPost = (id, option) => {
  return async (dispatch, getState) => {
    const updatedPost = await fetchAsync(`http://localhost:3001/posts/${id}`, {
      method: 'POST',
      body: JSON.stringify({ option })
    });

    dispatch({
      type: types.UPDATE_POST,
      payload: {
        post: updatedPost
      }
    });

    return updatedPost;
  };
};
