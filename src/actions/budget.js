// import { makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from '../helpers/api';

// import { CLEAR_ALL_BUDGET,STORE_BUDGET_SALES, STORE_BUDGET_BLENDED_SALES, STORE_WEEK_EXPENSES, STORE_WEEK_INVOICES } from './types';

// export function clearAllBudgetStorage() {
// 	return async function(dispatch) {
// 		await dispatch({
// 			type    : CLEAR_ALL_BUDGET
// 		});
// 	};
// }

// export function getAndStoreBudgetSales(restaurantId, date) {
// 	return async function(dispatch) {
// 		try {
// 			const res = await makeGetRequest(`sales/restaurants/${restaurantId}/date/${date}`);
// 			if (res.status === 200) {
// 				const { sales } = res.data;
// 				await dispatch({
// 					type  : STORE_BUDGET_SALES,
// 					date,
// 					sales
// 				});
// 			}
// 			return res;
// 		} catch (err) {
// 			console.log('getAndStoreBudgetSales() error:', err);
// 		}
// 	};
// }

// export function storeBudgetBlendedSales(date, blended) {
// 	return async function(dispatch) {
// 		await dispatch({
// 			type    : STORE_BUDGET_BLENDED_SALES,
// 			date,
// 			blended
// 		});
// 	};
// }

// export function getAndStoreWeekExpenses(restaurantId, startDate, endDate) {
// 	return async function(dispatch) {
// 		try {
// 			const res = await makeGetRequest(
// 				`expenses/restaurants/${restaurantId}/startdate/${startDate}/enddate/${endDate}`
// 			);
// 			if (res.status === 200) {
// 				const { expenses } = res.data;
// 				await dispatch({
// 					type     : STORE_WEEK_EXPENSES,
// 					expenses
// 				});
// 			}
// 			return res;
// 		} catch (err) {
// 			console.log('getAndStoreWeekExpenses() error:', err);
// 		}
// 	};
// }

// export function getAndStoreWeekInvoices(restaurantId, startDate, endDate) {
// 	return async function(dispatch) {
// 		try {
// 			const res = await makeGetRequest(
// 				`invoices/restaurants/${restaurantId}/startdate/${startDate}/enddate/${endDate}`
// 			);
// 			if (res.status === 200) {
// 				const { invoices } = res.data;
// 				await dispatch({
// 					type     : STORE_WEEK_INVOICES,
// 					invoices
// 				});
// 			}
// 			return res;
// 		} catch (err) {
// 			console.log('getAndStoreWeekInvoices() error:', err);
// 		}
// 	};
// }
