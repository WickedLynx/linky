import { combineReducers } from 'redux';
import tagsReducer from './reducer_tags';
import reducerAllLinks from './reducer_all_links';

const rootReducer = combineReducers({
  tags: tagsReducer,
  allLinks: reducerAllLinks
});

export default rootReducer;
