import * as types from '../constants/actionTypes';
import { uniqBy } from 'lodash';

const comments = [];

export default function reducer(state = comments, action) {
  switch (action.type) {
    case types.SET_COMMENTS:
      return action.payload.comments;
    case types.CREATE_COMMENT:
      return [...state, action.payload.comment];
    default:
      return state;
  }
}
