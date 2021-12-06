import { BackendApi } from '../api/api';

import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from './types';

export function registerExpense(id, data) {
	return async function(dispatch) {
		data.restaurantId = id;
		data.categoryId = Number(data.categoryId);
		data.amount = Number(data.amount);
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.postExpenseApi(data);
		if (res.status === 201) {
			const {expense} = res.data
			await dispatch({
				type    : ADD_EXPENSE,
				expense
			});
		}
		return res;
	};
}

export function updateExpense(id, data) {
	return async function(dispatch) {
		data.categoryId = Number(data.categoryId);
		data.amount = Number(data.amount);
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.putExpenseApi(id, data);
		if (res.status === 200) {
			const { expense } = res.data;
			await dispatch({
				type    : UPDATE_EXPENSE,
				expense
			});
		}
		return res;
	};
}

export function deleteExpense(id) {
	return async function(dispatch) {
		const res = await BackendApi.deleteExpenseApi(id);
		if (res.status === 200) {
			const { deleted } = res.data;
			await dispatch({
				type    : DELETE_EXPENSE,
				deleted
			});
		}
		return res;
	};
}
