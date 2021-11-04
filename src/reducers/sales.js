import {
	ADD_SALE,
	DELETE_SALE,
	LOGOUT_USER,
	REMOVE_ACTIVE,
	STORE_SALES,
	// STORE_BLENDED_SALES,
	UPDATE_SALE
} from '../actions/types';

const INITIAL_STATE = {
	sales      : null,
	calculated : null
};

function sortByName(array) {
	// https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array for help with sorting objects in an array on a property in the array
	return array.sort((a, b) => {
		var textA = a.name.toUpperCase();
		var textB = b.name.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}

export default function sales(state = INITIAL_STATE, action) {
	let adjustedSales, sales, restaurant;

	switch (action.type) {
		case ADD_SALE:
			return {
				...state,
				sales : [ ...state.sales, action.sale ]
			};

		case DELETE_SALE:
			const deletedSaleId = Number(action.deleted);
			return {
				...state,
				sales : state.sales.filter(s => s.id !== deletedSaleId)
			};

		case LOGOUT_USER:
			return INITIAL_STATE;

		case REMOVE_ACTIVE:
			return INITIAL_STATE;

		case STORE_SALES:
			return {
				...state,
				sales : action.sales
			};

		// case STORE_BLENDED_SALES:
		// 	return {
		// 		...state,
		// 		calculated : action.calculated
		// 	};

		case UPDATE_SALE:
			const updatedSale = action.sale;
			sales = state.sales;
			adjustedSales = [];
			for (let i = 0; i < sales.length; i++) {
				if (sales[i].id === updatedSale.id) {
					adjustedSales.push(updatedSale);
				}
				else {
					adjustedSales.push(sales[i]);
				}
			}
			return {
				...state,
				sales : adjustedSales
			};

		default:
			return state;
	}
}
