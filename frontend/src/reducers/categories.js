import * as types from '../constants/actionTypes';

const categories = [];

export default function reducer(state = categories, action) {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return action.payload.categories;
    default:
      return state;
  }
}
