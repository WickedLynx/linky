import { DELETE_LINK_ERROR, DELETE_LINK_LOADED, DELETE_LINK_LOADING } from '../actions/index';

const INITIAL_STATE = {
	isLoading: false,
	error: null
}

export default function reducerDeleteLink(state=INITIAL_STATE, action) {
	switch (action.type) {
		case DELETE_LINK_LOADING:
			return { isLoading: true, error: nil };
		case DELETE_LINK_LOADED:
			return { isLoading: false, error: null };
		case DELETE_LINK_ERROR:
			return { isLoading: false, error: action.error };
		default:
			return state;
	}
}
