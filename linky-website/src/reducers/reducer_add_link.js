import { ADD_LINK_LOADING, ADD_LINK_LOADED, ADD_LINK_ERROR } from '../actions/index';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  link: null
}

export default function reducerAddLink(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_LINK_LOADING:
      return { isLoading: true, error: null, link: null };
    case ADD_LINK_LOADED:
      return { isLoading: false, error: null, link: action.data };
    case ADD_LINK_ERROR:
      return { isLoading: false, error: action.error, link: null };
    default:
      return state;
  }
}
