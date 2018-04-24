import { combineReducers } from 'redux';
import tagsReducer from './reducer_tags';
import reducerAllLinks from './reducer_all_links';
import reducerAddLink from './reducer_add_link';

const rootReducer = combineReducers({
  tags: tagsReducer,
  allLinks: reducerAllLinks,
  addLink: reducerAddLink
});

export default rootReducer;
