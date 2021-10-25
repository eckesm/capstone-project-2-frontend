import { makeDeleteRequest, makePostRequest, makePutRequest } from '../helpers/api';

import { ADD_MEAL_PERIOD, DELETE_MEAL_PERIOD, UPDATE_MEAL_PERIOD } from './types';

export function registerMealPeriod(id, data) {
	return async function(dispatch) {
		try {
			data.restaurantId = id;
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePostRequest(`mealperiods`, data);
			if (res.status === 201) {
				const mealPeriod = res.data.mealPeriod;
				await dispatch({
					type       : ADD_MEAL_PERIOD,
					mealPeriod
				});
			}
			return res;
		} catch (err) {
			console.log('registerMealPeriod() error:', err);
		}
	};
}

export function updateMealPeriod(id, data) {
	return async function(dispatch) {
		try {
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePutRequest(`mealperiods/${id}`, data);
			if (res.status === 200) {
				const { mealPeriod } = res.data;
				await dispatch({
					type       : UPDATE_MEAL_PERIOD,
					mealPeriod
				});
			}
			return res;
		} catch (err) {
			console.log('updateMealPeriod() error:', err);
		}
	};
}

export function deleteMealPeriod(id) {
	return async function(dispatch) {
		try {
			const res = await makeDeleteRequest(`mealperiods/${id}`);
			if (res.status === 200) {
				const { deleted } = res.data;
				await dispatch({
					type    : DELETE_MEAL_PERIOD,
					deleted
				});
			}
			return res;
		} catch (err) {
			console.log('deleteMealPeriod() error:', err);
		}
	};
}
