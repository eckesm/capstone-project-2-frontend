import { BackendApi } from '../api/api';

import {
	ADD_SALE,
	DELETE_SALE,
	STORE_SALES,
	// STORE_BLENDED_SALES,
	UPDATE_SALE
} from './types';

export function registerSale(data) {
	return async function(dispatch) {
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

		const res = await BackendApi.postSaleApi(data);
		if (res.status === 201) {
			const { sale } = res.data;
			await dispatch({
				type : ADD_SALE,
				sale
			});
		}
		return res;
	};
}

export function updateSale(id, data) {
	return async function(dispatch) {
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

		const res = await BackendApi.putSaleApi(id, data);
		if (res.status === 200) {
			const { sale } = res.data;
			await dispatch({
				type : UPDATE_SALE,
				sale
			});
		}
		return res;
	};
}

export function getAndStoreSales(restaurantId, date) {
	return async function(dispatch) {
		// const res = await makeGetRequest(`sales/restaurants/${restaurantId}/date/${date}`);
		const res = await BackendApi.getRestaurantSalesApi(restaurantId, date);
		if (res.status === 200) {
			const { sales } = res.data;
			await dispatch({
				type  : STORE_SALES,
				sales
			});
		}
		return res;
	};
}

export function deleteSale(id) {
	return async function(dispatch) {
		const res = await BackendApi.deleteSaleApi(id);
		if (res.status === 200) {
			const { deleted } = res.data;
			await dispatch({
				type    : DELETE_SALE,
				deleted
			});
		}
		return res;
	};
}
