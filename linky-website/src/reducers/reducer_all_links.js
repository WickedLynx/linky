import { ALL_LINKS_LOADING, ALL_LINKS_LOADED, ALL_LINKS_ERROR } from '../actions/index';
import Cache from '../other/cache';

const INITIAL_STATE = {
  links: [],
  error: null,
  isLoading: false
}

export default function reducerAllLinks(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_LINKS_LOADING:
      return { isLoading: true, links: Cache.links(), error: null };
    case ALL_LINKS_LOADED:
		const links = action.data.sort((link, other) => {
			return new Date(other.dateCreated) - new Date(link.dateCreated);
		});
		Cache.storeLinks(links);
      return { isLoading: false, links: links, error: null };
    case ALL_LINKS_ERROR:
      return { isLoading: false, links: Cache.links(), error: action.error };
    default:
      return state;
  }
}
