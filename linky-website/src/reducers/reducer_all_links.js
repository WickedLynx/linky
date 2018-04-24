import { ALL_LINKS_LOADING, ALL_LINKS_LOADED, ALL_LINKS_ERROR } from '../actions/index';

const INITIAL_STATE = {
  links: [],
  error: null,
  isLoading: false
}

export default function reducerAllLinks(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_LINKS_LOADING:
      return { isLoading: true, links: [], error: null };
    case ALL_LINKS_LOADED:
      return { isLoading: false, links: action.data, error: null };
    case ALL_LINKS_ERROR:
      return { isLoading: false, links: [], error: action.error };
    default:
      return state;
  }
}
