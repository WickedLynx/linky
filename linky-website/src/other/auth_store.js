const tokenKey = 'token';

export default class AuthStore {
	static token() {
		return window.localStorage.getItem(tokenKey);
	}

	static saveToken(token) {
		window.localStorage.setItem(tokenKey, token);
	}

	static authHeader() {
		return	{ Authorization: "Bearer " + AuthStore.token() }
	}

	static isLoggedIn() {
		const token = AuthStore.token();
		return (token && token.length > 0);
	}

	static logout() {
		window.localStorage.removeItem(tokenKey);
	}
}


