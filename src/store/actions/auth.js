import axios from 'axios';
import * as actionTypes from './actionTypes';
/**local Storage API is baked into the browser?
 * local storage can be accessed with cross-site scripting attacks,
 * 	but they are prevented by react, you can't output insecure code
 * 	by default.
 * Another safety net is that the token expires, here after 1 hour.
 * The Refresh Token DOESN'T EXPIRE, and can be used to request
 * 	new tokens, it can be stored in local storage and since it's
 * 	"only" accesible via cross-site scripting attacks it's safe,
 * 	but even then it has security issues by its nature.
 * 	It's important to be very careful about protecting this
 * 	refresh token, although it can help user experience a lot
 * 	by removing the need to login if you already did in the same pc.
 * 
 * TL;DR: It's preferred to not use the refresh token for security
 * 	reasons, local storage is relatively safe for normal tokens.
 */
//more links on authentication:
/**
SPA Authentication in general: https://stormpath.com/blog/token-auth-spa
Firebase authentication REST API: https://firebase.google.com/docs/reference/rest/auth/ 
*/

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	}
};

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);//timeout uses miliseconds
	};
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcjlKlEgJ2L35Ehxc2JVM2wJvsN20zF2E';
		if (!isSignup) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcjlKlEgJ2L35Ehxc2JVM2wJvsN20zF2E';
		}
		//docs:
		//https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
		axios.post(url, authData)
			.then(response => {
				//console.log(response);
				//comments on local storage at the start
				const expirationDate = new Date(new Date().getTime()
					+ response.data.expiresIn * 1000);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				//alternatively i can fetch user data as shown in:
				//https://firebase.google.com/docs/reference/rest/auth/#section-get-account-info
				localStorage.setItem('userId', response.data.localId);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(err => {
				//console.log(err);
				//dispatch(authFail(err)); //order of data changed
				//console.log(err.response);
				//dispatch(authFail(err.response));
				//giving the specific error to show it vvv
				dispatch(authFail(err.response.data.error));
			});
	}
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	}
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());//error, we should login
			} else {
				//alternatively I can get userId from server, link w info above
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout(
					(expirationDate.getTime() - new Date().getTime())
					/ 1000 //cuz checkAuth expects seconds, getTime() gives ms
				));
			}
		}
	}
};