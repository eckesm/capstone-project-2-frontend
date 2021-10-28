import { makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from '../helpers/api';

import { ADD_SALE, DELETE_SALE, STORE_SALES, STORE_BLENDED_SALES, UPDATE_SALE } from './types';

export function registerSale(data) {
	return async function(dispatch) {
		try {
			data.expectedSales = Number(data.expectedSales);
			if (data.actualSales) {
				data.actualSales = Number(data.actualSales);
			}
			else {
				data.actualSales = null;
			}
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePostRequest(`sales`, data);
			if (res.status === 201) {
				const sale = res.data.sale;
				await dispatch({
					type : ADD_SALE,
					sale
				});
			}
			return res;
		} catch (err) {
			console.log('registerSale() error:', err);
		}
	};
}

export function updateSale(id, data) {
	return async function(dispatch) {
		try {
			data.expectedSales = Number(data.expectedSales);
			if (data.actualSales) {
				data.actualSales = Number(data.actualSales);
			}
			else {
				data.actualSales = null;
			}
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePutRequest(`sales/${id}`, data);
			if (res.status === 200) {
				const { sale } = res.data;
				await dispatch({
					type : UPDATE_SALE,
					sale
				});
			}
			return res;
		} catch (err) {
			console.log('updateSale() error:', err);
		}
	};
}

export function getAndStoreSales(restaurantId, date) {
	return async function(dispatch) {
		try {
			const res = await makeGetRequest(`sales/restaurants/${restaurantId}/date/${date}`);
			if (res.status === 200) {
				const { sales } = res.data;
				await dispatch({
					type  : STORE_SALES,
					sales
				});
			}
			return res;
		} catch (err) {
			console.log('getAndStoreSales() error:', err);
		}
	};
}

export function storeSalesWithEstimates(calculated) {
	return async function(dispatch) {
		await dispatch({
			type       : STORE_BLENDED_SALES,
			calculated
		});
	};
}

export function deleteSale(id) {
	return async function(dispatch) {
		try {
			const res = await makeDeleteRequest(`sales/${id}`);
			if (res.status === 200) {
				const { deleted } = res.data;
				await dispatch({
					type    : DELETE_SALE,
					deleted
				});
			}
			return res;
		} catch (err) {
			console.log('deleteSale() error:', err);
		}
	};
}
