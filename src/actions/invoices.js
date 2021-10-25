import { makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from '../helpers/api';

import { ADD_INVOICE, DELETE_INVOICE, UPDATE_INVOICE } from './types';

export function registerInvoice(id, data) {
	return async function(dispatch) {
		try {
			data.restaurantId = id;
			data.total = Number(data.total);
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePostRequest(`invoices`, data);
			if (res.status === 201) {
				const invoice = res.data.invoice;
				await dispatch({
					type    : ADD_INVOICE,
					invoice
				});
			}
			return res;
		} catch (err) {
			console.log('registerInvoice() error:', err);
		}
	};
}

export function updateInvoice(id, data) {
	return async function(dispatch) {
		try {
			data.total = Number(data.total);
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePutRequest(`invoices/${id}`, data);
			if (res.status === 200) {
				const { invoice } = res.data;
				await dispatch({
					type    : UPDATE_INVOICE,
					invoice
				});
			}
			return res;
		} catch (err) {
			console.log('updateInvoice() error:', err);
		}
	};
}

export function deleteInvoice(id) {
	return async function(dispatch) {
		try {
			const res = await makeDeleteRequest(`invoices/${id}`);
			if (res.status === 200) {
				const { deleted } = res.data;
				await dispatch({
					type    : DELETE_INVOICE,
					deleted
				});
			}
			return res;
		} catch (err) {
			console.log('deleteInvoice() error:', err);
		}
	};
}
