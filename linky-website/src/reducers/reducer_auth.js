import { LOGIN_LOADING, LOGIN_LOADED, LOGIN_ERROR, LOGOUT } from '../actions/index';
import AuthStore from '../other/auth_store';

const INITIAL_STATE = {
	isLoading: false,
	isLoggedIn: AuthStore.isLoggedIn(),
	error: null
}

export default function reducerAuth(state=INITIAL_STATE, action) {
	switch (action.type) {
		case LOGIN_LOADING:
			return { isLoading: true, isLoggedIn: AuthStore.isLoggedIn(), error: null };
		case LOGIN_LOADED:
			const token = action.data.token;
			AuthStore.saveToken(token);
			return { isLoading: false, isLoggedIn: AuthStore.isLoggedIn(), error: null };
		case LOGIN_ERROR:
			return { isLoading: false, isLoggedIn: AuthStore.isLoggedIn(), error: action.error };
		case LOGOUT:
			return { isLoading: false, isLoggedIn: AuthStore.isLoggedIn(), error: null };

		default:
			return state;
	}
}


