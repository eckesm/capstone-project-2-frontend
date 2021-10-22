import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// const customAxios = axios.create({});

export function getAccessToken() {
	return localStorage.getItem('token') || null;
}

export async function makeGetRequest(path = '') {
	try {
		const token = getAccessToken();
		const headers = { 'Content-Type': 'application/json' };

		if (token) {
			headers.authorization = 'bearer ' + token;
		}
		const res = await axios.get(`${API_URL}/${path}`, {
			headers : headers
		});
		return res;
	} catch (err) {
		const { error } = err.response.data;
		if (error) {
			return {
				status  : error.status,
				message : error.message
			};
		}
		else {
			console.log(err);
		}
	}
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
		const { error } = err.response.data;
		if (error) {
			return {
				status  : error.status,
				message : error.message
			};
		}
		else {
			console.log(err);
		}
	}
}

export async function makePutRequest(path = '', data = {}) {
	try {
		const token = getAccessToken();
		const headers = { 'Content-Type': 'application/json' };

		if (token) {
			headers.authorization = 'bearer ' + token;
		}
		const res = await axios.put(`${API_URL}/${path}`, data, { headers: headers });
		return res;
	} catch (err) {
		const { error } = err.response.data;
		if (error) {
			return {
				status  : error.status,
				message : error.message
			};
		}
		else {
			console.log(err);
		}
	}
}

export async function makeDeleteRequest(path = '') {
	try {
		const token = getAccessToken();
		const headers = { 'Content-Type': 'application/json' };

		if (token) {
			headers.authorization = 'bearer ' + token;
		}
		const res = await axios.delete(`${API_URL}/${path}`, { headers: headers });
		return res;
	} catch (err) {
		const { error } = err.response.data;
		if (error) {
			return {
				status  : error.status,
				message : error.message
			};
		}
		else {
			console.log(err);
		}
	}
}

// mealperiods API calls

export async function getMealPeriodApi(id) {
	try {
		const res = await makeGetRequest(`mealperiods/${id}`);
		return res;
	} catch (err) {
		console.log('getMealPeriodInfo() error:', err);
	}
}

// catGroups API calls

export async function getCategoryGroupApi(id) {
	try {
		const res = await makeGetRequest(`catgroups/${id}`);
		return res;
	} catch (err) {
		console.log('getCategoryGroupApi() error:', err);
	}
}
