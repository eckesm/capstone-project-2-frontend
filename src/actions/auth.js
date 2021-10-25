import { makeGetRequest, makePostRequest } from '../helpers/api';
import { LOGOUT_USER, STORE_USER_INFO, STORE_USER_RESTAURANTS } from './types';

// export function getAndStoreToken(emailAddress, password) {
// 	return async function(dispatch) {
// 		try {
// 			const res = await makePostRequest('auth/token', { emailAddress, password });
// 			if (res.data.hasOwnProperty('token')) {
// 				localStorage.setItem('token', res.data.token);
// 			}
// 			return res;
// 		} catch (err) {
// 			console.log('getAndStoreToken() error:', err);
// 		}
// 	};
// }

export function getAndStoreUserInfo() {
	return async function(dispatch) {
		try {
			const res = await makeGetRequest('users/token');
			if (res.status === 200) {
				dispatch({
					type : STORE_USER_INFO,
					user : res.data.user
				});
				dispatch({
					type        : STORE_USER_RESTAURANTS,
					restaurants : res.data.user.restaurants
				});
			}
			return res;
		} catch (err) {
			console.log('getAndStoreUserInfo() error:', err);
		}
	};
}

export function logoutUser() {
	return async function(dispatch) {
		dispatch({
			type : LOGOUT_USER
		});
		localStorage.removeItem('token');
	};
}
