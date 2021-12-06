import { BackendApi } from '../api/api';

import { ADD_MEAL_PERIOD, DELETE_MEAL_PERIOD, UPDATE_MEAL_PERIOD } from './types';

export function registerMealPeriod(id, data) {
	return async function(dispatch) {
		data.restaurantId = id;
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.postMealPeriodApi(data);
		if (res.status === 201) {
			const mealPeriod = res.data.mealPeriod;
			await dispatch({
				type       : ADD_MEAL_PERIOD,
				mealPeriod
			});
		}
		return res;
	};
}

export function updateMealPeriod(id, data) {
	return async function(dispatch) {
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.putMealPeriodApi(id, data);
		if (res.status === 200) {
			const { mealPeriod } = res.data;
			await dispatch({
				type       : UPDATE_MEAL_PERIOD,
				mealPeriod
			});
		}
		return res;
	};
}

export function deleteMealPeriod(id) {
	return async function(dispatch) {
		const res = await BackendApi.deleteMealPeriodApi(id);
		if (res.status === 200) {
			const { deleted } = res.data;
			await dispatch({
				type    : DELETE_MEAL_PERIOD,
				deleted
			});
		}
		return res;
	};
}
