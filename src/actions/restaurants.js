import { makeGetRequest, makePostRequest } from '../helpers/api';

import { ADD_NEW_RESTAURANT, STORE_ACTIVE_RESTAURANT } from './types';

export function registerRestaurant(restaurantData) {
	return async function(dispatch) {
		try {
			if (restaurantData.address === '') {
				delete restaurantData.address;
			}
			if (restaurantData.phone === '') {
				delete restaurantData.phone;
			}
			if (restaurantData.email === '') {
				delete restaurantData.email;
			}
			if (restaurantData.website === '') {
				delete restaurantData.website;
			}
			if (restaurantData.notes === '') {
				delete restaurantData.notes;
			}

			const res = await makePostRequest('restaurants', restaurantData);
			if (res.status === 201) {
				const restaurant = res.data.restaurant;
				restaurant.isAdmin = true;
				dispatch({
					type       : ADD_NEW_RESTAURANT,
					restaurant : restaurant
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
		const res = await makeGetRequest(`restaurants/${id}`);
		console.log(res);
		// try {
			if (res.status === 200) {
				dispatch({
					type       : STORE_ACTIVE_RESTAURANT,
					restaurant : res.data.restaurant
				});
			}
			else {
				console.log(res);
			}
		// } catch (err) {
		// 	console.log('getAndStoreRestaurantInfo() error:', err);
		// }
	};
}
