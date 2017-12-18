import * as types from '../constants/actionTypes';
import { uniqBy } from 'lodash';

const posts = [];

export default function reducer(state = posts, action) {
  switch (action.type) {
    case types.SET_POST:
      return uniqBy([...state, action.payload.post], 'id');
    case types.SET_POSTS:
      return action.payload.posts;
    case types.CREATE_POST:
      return [...state, action.payload.post];
    case types.DELETE_POST:
      return state.filter(post => post.id !== action.payload.id);
    case types.UPDATE_POST:
      return state.map(post => {
        if (post.id === action.payload.post.id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
    default:
      return state;
  }
}
