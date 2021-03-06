import axios from 'axios';
import AuthStore from '../other/auth_store';
import Cache from '../other/cache';
import { ApiURL } from '../config';

export const LOADING_TAGS = 'LOADING_TAGS';
export const LOADED_TAGS = 'LOADED_TAGS';
export const LOAD_TAGS_ERROR = 'LOAD_TAGS_ERROR';

export const ALL_LINKS_LOADING = 'ALL_LINKS_LOADING';
export const ALL_LINKS_LOADED = 'ALL_LINKS_LOADED';
export const ALL_LINKS_ERROR = 'ALL_LINKS_ERROR';

export const ADD_LINK_LOADING = 'ADD_LINK_LOADING';
export const ADD_LINK_LOADED = 'ADD_LINK_LOADED';
export const ADD_LINK_ERROR = 'ADD_LINK_ERROR';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_LOADED = 'LOGIN_LOADED';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = "LOGOUT";

export const DELETE_LINK_LOADING = "DELETE_LINK_LOADING";
export const DELETE_LINK_LOADED = "DELETE_LINK_LOADED";
export const DELETE_LINK_ERROR = "DELETE_LINK_ERROR";

function parseError(error) {
  var errorToReturn = { message: "Unknown error :(", code: 500 };
  if (error && error.response && error.response.data) {
	  errorToReturn.message = error.response.data.message || "Unknown error :(";
	  errorToReturn.code = error.response.data.code || 500;
  }
  return errorToReturn;
}

export const fetchTags = () => dispatch => {
  dispatch({
    type: LOADING_TAGS
  });
  return axios.get(ApiURL + '/tags', { headers: AuthStore.authHeader() })
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
  });
}

export const fetchAllLinks = () => dispatch => {
  dispatch({
    type: ALL_LINKS_LOADING
  });
  return axios.get(ApiURL + '/links', { headers: AuthStore.authHeader() })
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
  });
}

export const addLink = (link) => dispatch => {
  dispatch({
    type: ADD_LINK_LOADING
  });
  return axios.post(ApiURL + '/links/add', {
    url: link.url,
    tags: link.tags
  }, { headers: AuthStore.authHeader() }).then(response => {
    dispatch({
      type: ADD_LINK_LOADED,
      data: response.data.data
    });
  }).catch(error => {
    dispatch({
      type: ADD_LINK_ERROR,
      error: parseError(error)
    });
  });
}

export const deleteLink = (link) => dispatch => {
	dispatch({
		type: DELETE_LINK_LOADING
	});
	return axios.delete(ApiURL + '/links/delete/' + link._id, { headers: AuthStore.authHeader()}).then( response => {
		dispatch(fetchAllLinks());
		dispatch({
			type: DELETE_LINK_LOADED
		});
	}).catch( error => {
		dispatch({
			type: DELETE_LINK_ERROR,
			error: parseError(error)
		});
	});
}

export const login = (username, password) => dispatch => {
	dispatch({
		type: LOGIN_LOADING,
	});
	return axios.post(ApiURL + '/login', {
		username: username,
		password: password
	}).then(response => {
		dispatch({
			type: LOGIN_LOADED,
			data: response.data.data
		});
	}).catch(error => {
		dispatch({
			type: LOGIN_ERROR,
			error: parseError(error)
		});
	});
}

export const logout = () => dispatch => {
	AuthStore.logout();
	Cache.empty();
	dispatch({
		type: LOGOUT
	});
	dispatch(fetchTags());
	dispatch(fetchAllLinks());
}
