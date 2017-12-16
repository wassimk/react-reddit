import * as types from '../constants/actionTypes';

const posts = [];

export default function reducer(state = posts, action) {
  switch (action.type) {
    case types.SET_POSTS:
      return action.payload.posts;
    default:
      return state;
  }
}
