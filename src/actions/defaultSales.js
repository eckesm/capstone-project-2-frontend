import { BackendApi } from '../api/api';

import { ADD_DEFAULT_SALE, DELETE_DEFAULT_SALE, UPDATE_DEFAULT_SALE } from './types';

export function registerDefaultSale(data) {
	return async function(dispatch) {
		if (data.total === '') {
			data.total = 0;
		}
		else {
			data.total = Number(data.total);
		}
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.postDefaultSaleApi(data);
		if (res.status === 201) {
			const { defaultSale } = res.data;
			await dispatch({
				type        : ADD_DEFAULT_SALE,
				defaultSale
			});
		}
		return res;
	};
}

export function updateDefaultSale(id,data) {
	return async function(dispatch) {
		if (data.total === '') {
			data.total = 0;
		}
		else {
			data.total = Number(data.total);
		}
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.putDefaultSaleApi(id, data);
		if (res.status === 200) {
			const { defaultSale } = res.data;
			await dispatch({
				type        : UPDATE_DEFAULT_SALE,
				defaultSale
			});
		}
		return res;
	};
}

export function deleteDefaultSale(id) {
	return async function(dispatch) {
		const res = await BackendApi.deleteDefaultSaleApi(id);
		if (res.status === 200) {
			const { deleted } = res.data;
			await dispatch({
				type    : DELETE_DEFAULT_SALE,
				deleted
			});
		}
		return res;
	};
}
