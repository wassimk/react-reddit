import * as types from '../constants/actionTypes';

const comments = [];

export default function reducer(state = comments, action) {
  switch (action.type) {
    case types.SET_COMMENTS:
      return action.payload.comments;
    case types.CREATE_COMMENT:
      return [...state, action.payload.comment];
    case types.DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.payload.id);
    case types.UPDATE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.payload.comment.id) {
          return action.payload.comment;
        } else {
          return comment;
        }
      });
    default:
      return state;
  }
}
