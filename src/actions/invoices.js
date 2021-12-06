import { BackendApi, makeDeleteRequest, makePostRequest, makePutRequest } from '../api/api';

import { ADD_INVOICE, DELETE_INVOICE, UPDATE_INVOICE } from './types';

export function registerInvoice(id, data) {
	return async function(dispatch) {
		data.restaurantId = id;
		data.total = Number(data.total);
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.postInvoiceApi(data);
		if (res.status === 201) {
			const { invoice } = res.data;
			await dispatch({
				type    : ADD_INVOICE,
				invoice
			});
		}
		return res;
	};
}

export function updateInvoice(id, data) {
	return async function(dispatch) {
		data.total = Number(data.total);
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.putInvoiceApi(id, data);
		if (res.status === 200) {
			const { invoice } = res.data;
			await dispatch({
				type    : UPDATE_INVOICE,
				invoice
			});
		}
		return res;
	};
}

export function deleteInvoice(id) {
	return async function(dispatch) {
		const res = await BackendApi.deleteInvoiceApi(id);
		if (res.status === 200) {
			const { deleted } = res.data;
			await dispatch({
				type    : DELETE_INVOICE,
				deleted
			});
		}
		return res;
	};
}
