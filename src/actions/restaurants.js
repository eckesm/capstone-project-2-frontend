import { makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from '../helpers/api';

import { ADD_NEW_RESTAURANT, DELETE_RESTAURANT, STORE_ACTIVE_RESTAURANT, UPDATE_RESTAURANT } from './types';

export function registerRestaurant(data) {
	return async function(dispatch) {
		try {
			if (data.address === '') {
				delete data.address;
			}
			if (data.phone === '') {
				delete data.phone;
			}
			if (data.email === '') {
				delete data.email;
			}
			if (data.website === '') {
				delete data.website;
			}
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePostRequest('restaurants', data);
			if (res.status === 201) {
				const { restaurant } = res.data;
				restaurant.isAdmin = true;
				await dispatch({
					type       : ADD_NEW_RESTAURANT,
					restaurant
				});
			}
			return res;
		} catch (err) {
			console.log('registerRestaurant() error:', err);
		}
	};
}

export function getAndStoreRestaurantInfo(id) {
	return async function(dispatch) {
		try {
			const res = await makeGetRequest(`restaurants/${id}`);
			if (res.status === 200) {
				await dispatch({
					type       : STORE_ACTIVE_RESTAURANT,
					restaurant : res.data.restaurant
				});
				return res;
			}
			else {
				return res;
			}
		} catch (err) {
			console.log('getAndStoreRestaurantInfo() error:', err);
		}
	};
}

export function updateRestaurant(id, data) {
	return async function(dispatch) {
		try {
			if (data.address === '') {
				delete data.address;
			}
			if (data.phone === '') {
				delete data.phone;
			}
			if (data.email === '') {
				delete data.email;
			}
			if (data.website === '') {
				delete data.website;
			}
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePutRequest(`restaurants/${id}`, data);
			console.log(res);
			if (res.status === 200) {
				const { restaurant } = res.data;
				await dispatch({
					type       : UPDATE_RESTAURANT,
					restaurant
				});
			}
			return res;
		} catch (err) {
			console.log('updateRestaurant() error:', err);
		}
	};
}

export function deleteRestaurant(id) {
	return async function(dispatch) {
		try {
			const res = await makeDeleteRequest(`restaurants/${id}`);
			if (res.status === 200) {
				const { deleted } = res.data;
				await dispatch({
					type    : DELETE_RESTAURANT,
					deleted
				});
			}
			return res;
		} catch (err) {
			console.log('deleteRestaurant() error:', err);
		}
	};
}
