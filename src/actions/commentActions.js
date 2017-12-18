import { fetchAsync } from '../util/fetchAsync';
import * as types from '../constants/actionTypes';
import uuidv4 from 'uuid/v4';

export const createComment = commentParams => {
  return async dispatch => {
    const newComment = await fetchAsync('http://localhost:3001/comments', {
      method: 'POST',
      body: JSON.stringify({
        ...commentParams,
        timestamp: Date.now(),
        id: uuidv4()
      })
    });

    dispatch({
      type: types.CREATE_COMMENT,
      payload: {
        comment: newComment
      }
    });

    return newComment;
  };
};

export const fetchCommentsByPostId = id => {
  return async (dispatch, getState) => {
    const comments = await fetchAsync(`http://localhost:3001/posts/${id}/comments`);
    console.log(`http://localhost:3001/posts/${id}/comments`);

    dispatch({
      type: types.SET_COMMENTS,
      payload: {
        comments
      }
    });
  };
};
