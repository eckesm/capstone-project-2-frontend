import { makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from '../helpers/api';

import { ADD_DEFAULT_SALE, DELETE_DEFAULT_SALE, UPDATE_DEFAULT_SALE } from './types';

export function registerDefaultSale(data) {
	return async function(dispatch) {
		try {
			if (data.total === '') {
				data.total = 0;
			}
			else {
				data.total = Number(data.total);
			}
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePostRequest(`defaultsales`, data);
			if (res.status === 201) {
				const defaultSale = res.data.defaultSale;
				await dispatch({
					type        : ADD_DEFAULT_SALE,
					defaultSale
				});
			}
			return res;
		} catch (err) {
			console.log('registerDefaultSale() error:', err);
		}
	};
}

export function updateDefaultSale(data) {
	return async function(dispatch) {
		try {
			if (data.total === '') {
				data.total = 0;
			}
			else {
				data.total = Number(data.total);
			}
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePutRequest(`defaultsales/${data.id}`, data);
			if (res.status === 200) {
				const { defaultSale } = res.data;
				await dispatch({
					type        : UPDATE_DEFAULT_SALE,
					defaultSale
				});
			}
			return res;
		} catch (err) {
			console.log('updateDefaultSale() error:', err);
		}
	};
}

export function deleteDefaultSale(id) {
	return async function(dispatch) {
		try {
			const res = await makeDeleteRequest(`defaultSales/${id}`);
			if (res.status === 200) {
				const { deleted } = res.data;
				await dispatch({
					type    : DELETE_DEFAULT_SALE,
					deleted
				});
			}
			return res;
		} catch (err) {
			console.log('deleteDefaultSale() error:', err);
		}
	};
}
