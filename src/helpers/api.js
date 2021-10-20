import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

export function getAccessToken() {
	return localStorage.getItem('token') || null;
}

export async function makeGetRequest(path = '') {
	// try {
	const token = getAccessToken();
	const headers = { 'Content-Type': 'application/json' };

	if (token) {
		headers.authorization = 'bearer ' + token;
	}
	const res = await axios.get(`${API_URL}/${path}`, {
		headers : headers
	});
	console.log('makerequestres', res);
	return res;
	// } catch (err) {
	// console.log(err);
	// console.log('makeGetRequest() error:', err);
	// return err;
	// }
}

export async function makePostRequest(path = '', data = {}) {
	try {
		const token = getAccessToken();
		const headers = { 'Content-Type': 'application/json' };

		if (token) {
			headers.authorization = 'bearer ' + token;
		}
		const res = await axios.post(`${API_URL}/${path}`, data, { headers: headers });
		return res;
	} catch (err) {
		console.log('makePostRequest() error:', err);
	}
}
