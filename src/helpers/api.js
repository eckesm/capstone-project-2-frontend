import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// const customAxios = axios.create({});

export function getAccessToken() {
	return localStorage.getItem('token') || null;
}

export async function makeGetRequest(path = '') {
	try {
		const token = getAccessToken();
		const headers = {
			'Content-Type' : 'application/json'
			// 'Access-Control-Allow-Origin' : '*'
		};

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
		const headers = {
			'Content-Type' : 'application/json'
			// 'Access-Control-Allow-Origin' : '*'
		};

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
		const headers = {
			'Content-Type' : 'application/json'
			// 'Access-Control-Allow-Origin' : '*'
		};

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
		const headers = {
			'Content-Type' : 'application/json'
			// 'Access-Control-Allow-Origin' : '*'
		};

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

// auth API calls

export async function getAndStoreTokenApi(emailAddress, password) {
	try {
		const res = await makePostRequest('auth/token', { emailAddress, password });
		if (res.data && res.data.hasOwnProperty('token')) {
			localStorage.setItem('token', res.data.token);
		}
		return res;
	} catch (err) {
		console.log('getAndStoreToken() error:', err);
	}
}

// users API calls

export async function registerUserApi(data) {
	try {
		const res = await makePostRequest(`users`, data);
		if (res.data && res.data.hasOwnProperty('token')) {
			localStorage.setItem('token', res.data.token);
		}
		return res;
	} catch (err) {
		console.log('registerUserApi()', err);
	}
}

export async function lookupEmailAddressApi(emailAddress) {
	try {
		const res = await makeGetRequest(`users/email-address/${emailAddress}`);
		return res;
	} catch (err) {
		console.log('lookupEmailAddressApi()', err);
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

// categories API calls

export async function getCategoryApi(id) {
	try {
		const res = await makeGetRequest(`categories/${id}`);
		return res;
	} catch (err) {
		console.log('getCategoryApi() error:', err);
	}
}

// invoices API calls

export async function getInvoiceApi(id) {
	try {
		const res = await makeGetRequest(`invoices/${id}`);
		return res;
	} catch (err) {
		console.log('getInvoiceApi() error:', err);
	}
}

// sales API calls

export async function getSales(restaurantId, date) {
	try {
		const res = await makeGetRequest(`sales/restaurants/${restaurantId}/date/${date}`);
		return res;
	} catch (err) {
		console.log('getSales() error:', err);
	}
}

// budget API calls

// export async function getBudgetSales(restaurantId,date) {
// 	try {
// 		const res = await makeGetRequest(`sales/restaurants/${restaurantId}/date/${date}`);
// 		return res;
// 	} catch (err) {
// 		console.log('getBudgetSales() error:', err);
// 	}
// }

export async function getSavedExpenses(restaurantId, startDate, endDate) {
	try {
		const res = await makeGetRequest(
			`expenses/restaurants/${restaurantId}/startdate/${startDate}/enddate/${endDate}`
		);
		return res;
	} catch (err) {
		console.log('getSavedExpenses() error:', err);
	}
}
