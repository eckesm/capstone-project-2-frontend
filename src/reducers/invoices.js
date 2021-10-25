import {
	ADD_EXPENSE,
	ADD_INVOICE,
	DELETE_EXPENSE,
	DELETE_INVOICE,
	LOGOUT_USER,
	REMOVE_ACTIVE,
	STORE_ACTIVE_RESTAURANT,
	UPDATE_EXPENSE,
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
	let adjustedExpenses, adjustedInvoices, expenses, invoices, restaurant;

	switch (action.type) {
		case ADD_EXPENSE:
			return {
				...state,
				expenses : [ ...state.expenses, action.expense ]
			};

		case ADD_INVOICE:
			return {
				...state,
				invoices : [ ...state.invoices, action.invoice ]
			};

		case DELETE_EXPENSE:
			const deletedExpenseId = Number(action.deleted);
			return {
				...state,
				expenses : state.expenses.filter(e => e.id !== deletedExpenseId)
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

		case UPDATE_EXPENSE:
			const updatedExpense = action.expense;
			expenses = state.expenses;
			adjustedExpenses = [];
			for (let i = 0; i < expenses.length; i++) {
				if (expenses[i].id === updatedExpense.id) {
					adjustedExpenses.push(updatedExpense);
				}
				else {
					adjustedExpenses.push(expenses[i]);
				}
			}
			return {
				...state,
				expenses : adjustedExpenses
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
