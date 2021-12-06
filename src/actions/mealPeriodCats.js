import { BackendApi, makeDeleteRequest, makePostRequest, makePutRequest } from '../api/api';

import { ADD_MEAL_PERIOD_CATEGORY, DELETE_MEAL_PERIOD_CATEGORY, UPDATE_MEAL_PERIOD_CATEGORY } from './types';

export function registerMealPeriodCat(mealPeriodId, categoryId, data) {
	return async function(dispatch) {
		try {
			data.salesPercentOfPeriod = Number(data.salesPercentOfPeriod);
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await BackendApi.postMealPeriodCategoryApi(mealPeriodId, categoryId, data);
			if (res.status === 201) {
				const mealPeriodCat = res.data.mealPeriodCat;
				await dispatch({
					type          : ADD_MEAL_PERIOD_CATEGORY,
					mealPeriodCat
				});
			}
			return res;
		} catch (err) {
			console.log('registerMealPeriodCat() error:', err);
		}
	};
}

export function updateMealPeriodCat(mealPeriodId, categoryId, data) {
	return async function(dispatch) {
		try {
			data.salesPercentOfPeriod = Number(data.salesPercentOfPeriod);
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await BackendApi.putMealPeriodCategoryApi(mealPeriodId, categoryId, data);
			if (res.status === 200) {
				const { mealPeriodCat } = res.data;
				await dispatch({
					type          : UPDATE_MEAL_PERIOD_CATEGORY,
					mealPeriodCat
				});
			}
			return res;
		} catch (err) {
			console.log('updateMealPeriodCat() error:', err);
		}
	};
}

export function deleteMealPeriodCat(mealPeriodId, categoryId) {
	return async function(dispatch) {
		try {
			const res = await BackendApi.deleteMealPeriodCategoryApi(mealPeriodId, categoryId);
			if (res.status === 200) {
				const { deleted } = res.data;
				await dispatch({
					type    : DELETE_MEAL_PERIOD_CATEGORY,
					deleted
				});
			}
			return res;
		} catch (err) {
			console.log('deleteMealPeriodCat() error:', err);
		}
	};
}
