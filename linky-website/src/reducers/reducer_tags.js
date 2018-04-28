import { LOADING_TAGS, LOADED_TAGS, LOAD_TAGS_ERROR } from '../actions/index';
import Cache from '../other/cache';

const INITIAL_STATE = {
  isLoading: false,
  tags: [],
  error: null
}

export default function reducerTags(state=INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING_TAGS:
      return { isLoading: true, tags: Cache.tags(), error: null };
    case LOADED_TAGS:
		const tags = action.data.sort((tag, other) => {
			return tag.name > other.name;
		});
		Cache.storeTags(tags);
      return { isLoading: false, tags: tags, error: null };
    case LOAD_TAGS_ERROR:
      return { isLoading: false, tags: Cache.tags(), error: action.error };
    default:
    return state;
  }
}
