import { LOADING_TAGS, LOADED_TAGS, LOAD_TAGS_ERROR } from '../actions/index';

const INITIAL_STATE = {
  isLoading: false,
  tags: [],
  error: null
}

export default function reducerTags(state=INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING_TAGS:
      return { isLoading: true, tags: [], error: null };
    case LOADED_TAGS:
      return { isLoading: false, tags: action.data, error: null };
    case LOAD_TAGS_ERROR:
      return { isLoading: false, tags: [], error: action.error };
    default:
    return state;
  }
}
