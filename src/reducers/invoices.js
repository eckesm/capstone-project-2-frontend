import {
	ADD_INVOICE,
	DELETE_INVOICE,
	LOGOUT_USER,
	REMOVE_ACTIVE,
	STORE_ACTIVE_RESTAURANT,
	UPDATE_INVOICE
} from '../actions/types';

const INITIAL_STATE = {
	invoices : [],
	expenses : []
};

function sortByName(array) {
	// https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array for help with sorting objects in an array on a property in the array
	return array.sort((a, b) => {
		var textA = a.name.toUpperCase();
		var textB = b.name.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}

export default function invoices(state = INITIAL_STATE, action) {
	let invoices, restaurant, adjustedInvoices;

	switch (action.type) {
		case ADD_INVOICE:
			return {
				...state,
				invoices : [ ...state.invoices, action.invoice ]
			};

		case DELETE_INVOICE:
			const deletedInvoiceId = Number(action.deleted);
			return {
				...state,
				invoices : state.invoices.filter(i => i.id !== deletedInvoiceId)
			};

		case LOGOUT_USER:
			return INITIAL_STATE;

		case REMOVE_ACTIVE:
			return INITIAL_STATE;

		case STORE_ACTIVE_RESTAURANT:
			restaurant = action.restaurant;
			return {
				invoices : restaurant.invoices,
				expenses : restaurant.expenses
			};

		case UPDATE_INVOICE:
			const updatedInvoice = action.invoice;
			invoices = state.invoices;
			adjustedInvoices = [];
			for (let i = 0; i < invoices.length; i++) {
				if (invoices[i].id === updatedInvoice.id) {
					adjustedInvoices.push(updatedInvoice);
				}
				else {
					adjustedInvoices.push(invoices[i]);
				}
			}
			return {
				...state,
				invoices : adjustedInvoices
			};

		default:
			return state;
	}
}
