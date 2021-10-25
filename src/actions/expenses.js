import { makeDeleteRequest, makePostRequest, makePutRequest } from '../helpers/api';

import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from './types';

export function registerExpense(id, data) {
	return async function(dispatch) {
		try {
			data.restaurantId = id;
			data.categoryId = Number(data.categoryId);
			data.amount = Number(data.amount);
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePostRequest(`expenses`, data);
			if (res.status === 201) {
				const expense = res.data.expense;
				await dispatch({
					type    : ADD_EXPENSE,
					expense
				});
			}
			return res;
		} catch (err) {
			console.log('registerExpense() error:', err);
		}
	};
}

export function updateExpense(id, data) {
	return async function(dispatch) {
		try {
			data.categoryId = Number(data.categoryId);
			data.amount = Number(data.amount);
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePutRequest(`expenses/${id}`, data);
			if (res.status === 200) {
				const { expense } = res.data;
				await dispatch({
					type    : UPDATE_EXPENSE,
					expense
				});
			}
			return res;
		} catch (err) {
			console.log('updateExpense() error:', err);
		}
	};
}

export function deleteExpense(id) {
	return async function(dispatch) {
		try {
			const res = await makeDeleteRequest(`expenses/${id}`);
			if (res.status === 200) {
				const { deleted } = res.data;
				await dispatch({
					type    : DELETE_EXPENSE,
					deleted
				});
			}
			return res;
		} catch (err) {
			console.log('deleteExpense() error:', err);
		}
	};
}
