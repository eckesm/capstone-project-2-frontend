import { BackendApi, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from '../api/api';

import {
	ADD_NEW_RESTAURANT,
	ADD_USER_TO_RESTAURANT,
	CHANGE_USER_RESTAURANT_ACCESS,
	DELETE_RESTAURANT,
	DELETE_USER_RESTAURANT_ACCESS,
	REMOVE_ACTIVE,
	STORE_ACTIVE_RESTAURANT,
	UPDATE_RESTAURANT
} from './types';

export function registerRestaurant(data) {
	return async function(dispatch) {
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

		const res = await BackendApi.postRestaurantApi(data);
		if (res.status === 201) {
			const { restaurant } = res.data;
			restaurant.isAdmin = true;
			await dispatch({
				type       : ADD_NEW_RESTAURANT,
				restaurant
			});
		}
		return res;
	};
}

export function addUserToRestaurant(restaurantId, user, data) {
	return async function(dispatch) {
		const res = await BackendApi.postRestaurantUserApi(restaurantId, user.id, data);
		if (res.status === 201) {
			user.isAdmin = data.isAdmin;
			await dispatch({
				type : ADD_USER_TO_RESTAURANT,
				user
			});
		}
		return res;
	};
}

export function changeUserRestaurantAccess(restaurantId, user, data) {
	return async function(dispatch) {
		const res = await BackendApi.putRestaurantUserApi(restaurantId, user.id, data);
		if (res.status === 201) {
			user.isAdmin = data.isAdmin;
			await dispatch({
				type : CHANGE_USER_RESTAURANT_ACCESS,
				user
			});
		}
		return res;
	};
}

export function deleteUserRestaurantAccess(restaurantId, userId, self = false) {
	return async function(dispatch) {
		const res = await BackendApi.deleteRestaurantUserApi(restaurantId, userId);
		if (res.status === 200) {
			await dispatch({
				type   : DELETE_USER_RESTAURANT_ACCESS,
				userId,
				self
			});
		}
		return res;
	};
}

export function getAndStoreRestaurantInfo(id) {
	return async function(dispatch) {
		const res = await BackendApi.getRestaurantApi(id);
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
	};
}

export function removeActiveRestaurant() {
	return async function(dispatch) {
		await dispatch({
			type : REMOVE_ACTIVE
		});
	};
}

export function updateRestaurant(id, data) {
	return async function(dispatch) {
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

		const res = await BackendApi.putRestaurantApi(id, data);
		if (res.status === 200) {
			const { restaurant } = res.data;
			await dispatch({
				type       : UPDATE_RESTAURANT,
				restaurant
			});
		}
		return res;
	};
}

export function deleteRestaurant(id) {
	return async function(dispatch) {
		const res = await BackendApi.deleteRestaurantApi(id);
		if (res.status === 200) {
			const { deleted } = res.data;
			await dispatch({
				type    : DELETE_RESTAURANT,
				deleted
			});
		}
		return res;
	};
}
