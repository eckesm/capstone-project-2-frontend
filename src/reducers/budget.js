import {
	LOGOUT_USER,
	REMOVE_ACTIVE,
	STORE_BUDGET_SALES,
	STORE_BUDGET_BLENDED_SALES,
	STORE_WEEK_EXPENSES,
	STORE_WEEK_INVOICES
} from '../actions/types';

const INITIAL_STATE = {
	blended  : {},
	expenses : [],
	invoices : [],
	sales    : {}
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
	switch (action.type) {
		case LOGOUT_USER:
			return INITIAL_STATE;

		case REMOVE_ACTIVE:
			return INITIAL_STATE;

		case STORE_BUDGET_SALES:
			return {
				...state,
				sales : {
					...state.sales,
					[action.date]: action.sales
				}
			};

		case STORE_BUDGET_BLENDED_SALES:
			return {
				...state,
				blended : {
					...state.blended,
					[action.date]: action.blended
				}
			};

		case STORE_WEEK_EXPENSES:
			return {
				...state,
				expenses : action.expenses
			};

		case STORE_WEEK_INVOICES:
			return {
				...state,
				invoices : action.invoices
			};

		default:
			return state;
	}
}
