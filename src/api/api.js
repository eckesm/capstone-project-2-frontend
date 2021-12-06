import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export function getAccessToken() {
	return localStorage.getItem('token') || null;
}

export class BackendApi {
	static token = getAccessToken();

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API call:', endpoint, data, method);

		const url = `${API_URL}/${endpoint}`;
		const headers = {
			'Content-Type' : 'application/json',
			Authorization  : `bearer ${BackendApi.token}`
		};
		const params = method === 'get' ? data : {};

		try {
			// return (await axios({ url, method, data, params, headers })).data;
			return await axios({ url, method, data, params, headers });
		} catch (err) {
			// const { error } = err.response.data;
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

	// AUTH & USERS

	static async getAndStoreTokenApi(emailAddress, password) {
		let res = await this.request(`auth/token`, { emailAddress, password }, 'post');
		if (res.data && res.data.hasOwnProperty('token')) {
			localStorage.setItem('token', res.data.token);
		}
		return res;
	}

	static async registerUserApi(data) {
		let res = await this.request(`users`, data, 'post');
		if (res.data && res.data.hasOwnProperty('token')) {
			localStorage.setItem('token', res.data.token);
		}
		return res;
	}

	static async lookupEmailAddressApi(emailAddress) {
		let res = await this.request(`users/email-address/${emailAddress}`);
		return res;
	}

	// CATEGORIES

	static async getCategoryApi(id) {
		let res = await this.request(`categories/${id}`);
		return res;
	}

	static async postCategoryApi(data) {
		let res = await this.request(`categories`, data, 'post');
		return res;
	}

	static async putCategoryApi(id, data) {
		let res = await this.request(`categories/${id}`, data, 'put');
		return res;
	}

	static async deleteCategoryApi(id) {
		let res = await this.request(`categories/${id}`, {}, 'delete');
		return res;
	}

	// CATEGORY GROUPS

	static async getCategoryGroupApi(id) {
		let res = await this.request(`catgroups/${id}`);
		return res;
	}

	static async postCategoryGroupApi(data) {
		let res = await this.request(`catgroups`, data, 'post');
		return res;
	}

	static async putCategoryGroupApi(id, data) {
		let res = await this.request(`catgroups/${id}`, data, 'put');
		return res;
	}

	static async deleteCategoryGroupApi(id) {
		let res = await this.request(`catgroups/${id}`, {}, 'delete');
		return res;
	}

	// DEFAULT SALES

	static async postDefaultSaleApi(data) {
		let res = await this.request(`defaultsales`, data, 'post');
		return res;
	}

	static async putDefaultSaleApi(id, data) {
		let res = await this.request(`defaultsales/${id}`, data, 'put');
		return res;
	}

	static async deleteDefaultSaleApi(id) {
		let res = await this.request(`defaultsales/${id}`, {}, 'delete');
		return res;
	}

	// EXPENSES

	static async getRestaurantExpensesApi(restaurantId, startDate, endDate) {
		let res = await this.request(`expenses/restaurants/${restaurantId}/startdate/${startDate}/enddate/${endDate}`);
		return res;
	}

	static async postExpenseApi(data) {
		let res = await this.request(`expenses`, data, 'post');
		return res;
	}

	static async putExpenseApi(id, data) {
		let res = await this.request(`expenses/${id}`, data, 'put');
		return res;
	}

	static async deleteExpenseApi(id) {
		let res = await this.request(`expenses/${id}`, {}, 'delete');
		return res;
	}

	// INVOICES

	static async getInvoiceApi(id) {
		let res = await this.request(`invoices/${id}`);
		return res;
	}

	static async postInvoiceApi(data) {
		let res = await this.request(`invoices`, data, 'post');
		return res;
	}

	static async putInvoiceApi(id, data) {
		let res = await this.request(`invoices/${id}`, data, 'put');
		return res;
	}

	static async deleteInvoiceApi(id) {
		let res = await this.request(`invoices/${id}`, {}, 'delete');
		return res;
	}

	// MEAL PERIOD CATEGORIES

	static async postMealPeriodCategoryApi(mealPeriodId, categoryId, data) {
		let res = await this.request(`mealperiods/${mealPeriodId}/categories/${categoryId}`, data, 'post');
		return res;
	}

	static async putMealPeriodCategoryApi(mealPeriodId, categoryId, data) {
		let res = await this.request(`mealperiods/${mealPeriodId}/categories/${categoryId}`, data, 'put');
		return res;
	}

	static async deleteMealPeriodCategoryApi(mealPeriodId, categoryId) {
		let res = await this.request(`mealperiods/${mealPeriodId}/categories/${categoryId}`, {}, 'delete');
		return res;
	}

	// MEAL PERIODS

	static async getMealPeriodApi(id) {
		let res = await this.request(`mealperiods/${id}`);
		return res;
	}

	static async postMealPeriodApi(data) {
		let res = await this.request(`mealperiods`, data, 'post');
		return res;
	}

	static async putMealPeriodApi(id, data) {
		let res = await this.request(`mealperiods/${id}`, data, 'put');
		return res;
	}

	static async deleteMealPeriodApi(id) {
		let res = await this.request(`mealperiods/${id}`, {}, 'delete');
		return res;
	}

	// RESTAURANTS

	static async getRestaurantApi(id) {
		let res = await this.request(`restaurants/${id}`);
		return res;
	}

	static async postRestaurantApi(data) {
		let res = await this.request(`restaurants`, data, 'post');
		return res;
	}

	static async putRestaurantApi(id, data) {
		let res = await this.request(`restaurants/${id}`, data, 'put');
		return res;
	}

	static async deleteRestaurantApi(id) {
		let res = await this.request(`restaurants/${id}`, {}, 'delete');
		return res;
	}

	//RESTAURANT USERS

	static async postRestaurantUserApi(restaurantId, userId, data) {
		let res = await this.request(`restaurants/${restaurantId}/users/${userId}`, data, 'post');
		return res;
	}

	static async putRestaurantUserApi(restaurantId, userId, data) {
		let res = await this.request(`restaurants/${restaurantId}/users/${userId}`, data, 'put');
		return res;
	}

	static async deleteRestaurantUserApi(restaurantId, userId) {
		let res = await this.request(`restaurants/${restaurantId}/users/${userId}`, {}, 'delete');
		return res;
	}

	// SALES

	static async getRestaurantSalesApi(restaurantId, date) {
		let res = await this.request(`sales/restaurants/${restaurantId}/date/${date}`);
		return res;
	}

	static async postSaleApi(data) {
		let res = await this.request(`sales`, data, 'post');
		return res;
	}

	static async putSaleApi(id, data) {
		let res = await this.request(`sales/${id}`, data, 'put');
		return res;
	}

	static async deleteSaleApi(id) {
		let res = await this.request(`sales/${id}`, {}, 'delete');
		return res;
	}
}

export async function makeGetRequest(path = '') {
	try {
		let token = getAccessToken();
		const headers = {
			'Content-Type' : 'application/json'
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

// export async function getAndStoreTokenApi(emailAddress, password) {
// 	try {
// 		const res = await makePostRequest('auth/token', { emailAddress, password });
// 		if (res.data && res.data.hasOwnProperty('token')) {
// 			localStorage.setItem('token', res.data.token);
// 		}
// 		return res;
// 	} catch (err) {
// 		console.log('getAndStoreToken() error:', err);
// 	}
// }

// users API calls

// export async function registerUserApi(data) {
// 	try {
// 		const res = await makePostRequest(`users`, data);
// 		if (res.data && res.data.hasOwnProperty('token')) {
// 			localStorage.setItem('token', res.data.token);
// 		}
// 		return res;
// 	} catch (err) {
// 		console.log('registerUserApi()', err);
// 	}
// }

// export async function lookupEmailAddressApi(emailAddress) {
// 	try {
// 		const res = await makeGetRequest(`users/email-address/${emailAddress}`);
// 		return res;
// 	} catch (err) {
// 		console.log('lookupEmailAddressApi()', err);
// 	}
// }

// mealperiods API calls

// export async function getMealPeriodApi(id) {
// 	try {
// 		const res = await makeGetRequest(`mealperiods/${id}`);
// 		return res;
// 	} catch (err) {
// 		console.log('getMealPeriodInfo() error:', err);
// 	}
// }

// catGroups API calls

// export async function getCategoryGroupApi(id) {
// 	try {
// 		const res = await makeGetRequest(`catgroups/${id}`);
// 		return res;
// 	} catch (err) {
// 		console.log('getCategoryGroupApi() error:', err);
// 	}
// }

// categories API calls

// export async function getCategoryApi(id) {
// 	try {
// 		const res = await makeGetRequest(`categories/${id}`);
// 		return res;
// 	} catch (err) {
// 		console.log('getCategoryApi() error:', err);
// 	}
// }

// invoices API calls

// export async function getInvoiceApi(id) {
// 	try {
// 		const res = await makeGetRequest(`invoices/${id}`);
// 		return res;
// 	} catch (err) {
// 		console.log('getInvoiceApi() error:', err);
// 	}
// }

// sales API calls

// export async function getSales(restaurantId, date) {
// 	try {
// 		const res = await makeGetRequest(`sales/restaurants/${restaurantId}/date/${date}`);
// 		return res;
// 	} catch (err) {
// 		console.log('getSales() error:', err);
// 	}
// }

// budget API calls

// export async function getBudgetSales(restaurantId,date) {
// 	try {
// 		const res = await makeGetRequest(`sales/restaurants/${restaurantId}/date/${date}`);
// 		return res;
// 	} catch (err) {
// 		console.log('getBudgetSales() error:', err);
// 	}
// }

// export async function getSavedExpenses(restaurantId, startDate, endDate) {
// 	try {
// 		const res = await makeGetRequest(
// 			`expenses/restaurants/${restaurantId}/startdate/${startDate}/enddate/${endDate}`
// 		);
// 		return res;
// 	} catch (err) {
// 		console.log('getSavedExpenses() error:', err);
// 	}
// }
