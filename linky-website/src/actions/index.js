import axios from 'axios';

const API_BASE_URL = 'http://localhost:3060';

export const LOADING_TAGS = 'LOADING_TAGS';
export const LOADED_TAGS = 'LOADED_TAGS';
export const LOAD_TAGS_ERROR = 'LOAD_TAGS_ERROR';

export const ALL_LINKS_LOADING = 'ALL_LINKS_LOADING';
export const ALL_LINKS_LOADED = 'ALL_LINKS_LOADED';
export const ALL_LINKS_ERROR = 'ALL_LINKS_ERROR';

export const ADD_LINK_LOADING = 'ADD_LINK_LOADING';
export const ADD_LINK_LOADED = 'ADD_LINK_LOADED';
export const ADD_LINK_ERROR = 'ADD_LINK_ERROR';

function parseError(error) {
  var errorToReturn = { message: "Unknown error :(" };
  if (error && error.response && error.response.data && error.response.data.error) {
    errorToReturn = error.response.data.error;
  }
  return errorToReturn;
}

export const fetchTags = () => dispatch => {
  dispatch({
    type: LOADING_TAGS
  });
  return axios.get(API_BASE_URL + '/tags')
  .then(response => {
    dispatch({
      type: LOADED_TAGS,
      data: response.data.data
    });
  }).catch(error => {
    dispatch({
      type: LOAD_TAGS_ERROR,
      error: parseError(error)
    });
  })
}

export const fetchAllLinks = () => dispatch => {
  dispatch({
    type: ALL_LINKS_LOADING
  });
  return axios.get(API_BASE_URL + '/links')
  .then(response => {
    dispatch({
      type: ALL_LINKS_LOADED,
      data: response.data.data
    });
  }).catch(error => {
    dispatch({
      type: ALL_LINKS_ERROR,
      error: parseError(error)
    });
  })
}

export const addLink = (link) => dispatch => {
  dispatch({
    type: ADD_LINK_LOADING
  });
  return axios.post(API_BASE_URL + '/links/add', {
    url: link.url,
    tags: link.tags
  }).then(response => {
	  console.log(response.data.data);
    dispatch(fetchAllLinks());
    dispatch(fetchTags());
    dispatch({
      type: ADD_LINK_LOADED,
      data: response.data.data
    });
  }).catch(error => {
    dispatch({
      type: ADD_LINK_ERROR,
      error: parseError(error)
    });
  })
}