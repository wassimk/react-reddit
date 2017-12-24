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

export const deleteComment = id => {
  return async (dispatch, getState) => {
    await fetchAsync(`http://localhost:3001/comments/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: types.DELETE_COMMENT,
      payload: {
        id: id
      }
    });

    return new Promise(resolve => resolve());
  };
};

export const updateComment = comment => {
  return async (dispatch, getState) => {
    const updatedComment = await fetchAsync(`http://localhost:3001/comments/${comment.id}`, {
      method: 'PUT',
      body: JSON.stringify(comment)
    });

    dispatch({
      type: types.UPDATE_COMMENT,
      payload: {
        comment: updatedComment
      }
    });

    return updatedComment;
  };
};

export const fetchCommentsByPostId = id => {
  return async (dispatch, getState) => {
    const comments = await fetchAsync(`http://localhost:3001/posts/${id}/comments`);

    dispatch({
      type: types.SET_COMMENTS,
      payload: {
        comments
      }
    });
  };
};

export const upVoteComment = id => {
  return voteOnComment(id, 'upVote');
};

export const downVoteComment = id => {
  return voteOnComment(id, 'downVote');
};

const voteOnComment = (id, option) => {
  return async (dispatch, getState) => {
    const updatedComment = await fetchAsync(`http://localhost:3001/comments/${id}`, {
      method: 'POST',
      body: JSON.stringify({ option })
    });

    dispatch({
      type: types.UPDATE_COMMENT,
      payload: {
        comment: updatedComment
      }
    });

    return updatedComment;
  };
};
