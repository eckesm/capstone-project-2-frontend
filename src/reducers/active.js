import {
	ADD_CATEGORY,
	ADD_CATEGORY_GROUP,
	ADD_DEFAULT_SALE,
	ADD_MEAL_PERIOD,
	ADD_MEAL_PERIOD_CATEGORY,
	ADD_USER_TO_RESTAURANT,
	CHANGE_USER_RESTAURANT_ACCESS,
	DELETE_CATEGORY,
	DELETE_CATEGORY_GROUP,
	DELETE_DEFAULT_SALE,
	DELETE_MEAL_PERIOD,
	DELETE_MEAL_PERIOD_CATEGORY,
	DELETE_RESTAURANT,
	LOGOUT_USER,
	REMOVE_ACTIVE,
	STORE_ACTIVE_RESTAURANT,
	UPDATE_CATEGORY,
	UPDATE_CATEGORY_GROUP,
	UPDATE_DEFAULT_SALE,
	UPDATE_MEAL_PERIOD,
	UPDATE_MEAL_PERIOD_CATEGORY,
	UPDATE_RESTAURANT
} from '../actions/types';

const INITIAL_STATE = null;

function sortByName(array) {
	return array.sort((a, b) => {
		var textA = a.name.toUpperCase();
		var textB = b.name.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}
function sortByFirstAndLastName(array) {
	return array.sort((a, b) => {
		var textA = `${a.firstName.toUpperCase()}${a.lastName.toUpperCase()}`;
		var textB = `${b.firstName.toUpperCase()}${b.lastName.toUpperCase()}`;
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}

export default function active(state = INITIAL_STATE, action) {
	let restaurant;

	switch (action.type) {
		case ADD_CATEGORY:
			return {
				...state,
				categories : sortByName([ ...state.categories, action.category ])
			};

		case ADD_CATEGORY_GROUP:
			return {
				...state,
				catGroups : sortByName([ ...state.catGroups, action.catGroup ])
			};

		case ADD_DEFAULT_SALE:
			return {
				...state,
				defaultSales : [ ...state.defaultSales, action.defaultSale ]
			};

		case ADD_MEAL_PERIOD:
			return {
				...state,
				mealPeriods : sortByName([ ...state.mealPeriods, action.mealPeriod ])
			};

		case ADD_MEAL_PERIOD_CATEGORY:
			return {
				...state,
				mealPeriod_categories : [ ...state.mealPeriod_categories, action.mealPeriodCat ]
			};

		case ADD_USER_TO_RESTAURANT:
			return {
				...state,
				users : [ ...state.users, action.user ]
			};

		case CHANGE_USER_RESTAURANT_ACCESS:
			let users = state.users.filter(u => u.id !== action.user.id);
			return {
				...state,
				users : sortByFirstAndLastName([ ...users, action.user ])
			};

		case DELETE_CATEGORY:
			const deletedCategoryId = Number(action.deleted);
			return {
				...state,
				categories : state.categories.filter(c => c.id !== deletedCategoryId)
			};

		case DELETE_CATEGORY_GROUP:
			const deletedCatGroupId = Number(action.deleted);
			return {
				...state,
				catGroups : state.catGroups.filter(c => c.id !== deletedCatGroupId)
			};

		case DELETE_DEFAULT_SALE:
			const deletedDefaultSaleId = Number(action.deleted);
			return {
				...state,
				defaultSales : state.defaultSales.filter(ds => ds.id !== deletedDefaultSaleId)
			};

		case DELETE_MEAL_PERIOD:
			const deletedMealPeriodId = Number(action.deleted);
			return {
				...state,
				mealPeriods : state.mealPeriods.filter(m => m.id !== deletedMealPeriodId)
			};

		case DELETE_MEAL_PERIOD_CATEGORY:
			const deletedMealPeriodCatId = Number(action.deleted);
			return {
				...state,
				mealPeriod_categories : state.mealPeriod_categories.filter(mpc => mpc.id !== deletedMealPeriodCatId)
			};

		case DELETE_RESTAURANT:
			return INITIAL_STATE;

		case LOGOUT_USER:
			return INITIAL_STATE;

		case REMOVE_ACTIVE:
			return INITIAL_STATE;

		case STORE_ACTIVE_RESTAURANT:
			restaurant = { ...action.restaurant };
			delete restaurant.invoices;
			delete restaurant.expenses;
			return {
				...restaurant,
				mealPeriods : sortByName(restaurant.mealPeriods),
				categories  : sortByName(restaurant.categories),
				catGroups   : sortByName(restaurant.catGroups)
			};

		case UPDATE_CATEGORY:
			let categories = state.categories.filter(c => c.id !== action.category.id);
			return {
				...state,
				categories : sortByName([ ...categories, action.category ])
			};

		case UPDATE_CATEGORY_GROUP:
			let catGroups = state.catGroups.filter(cg => cg.id !== action.catGroup.id);
			return {
				...state,
				catGroups : sortByName([ ...catGroups, action.catGroup ])
			};

		case UPDATE_DEFAULT_SALE:
			let defaultSales = state.defaultSales.filter(ds => ds.id !== action.defaultSale.id);
			return {
				...state,
				defaultSales : [ ...defaultSales, action.defaultSale ]
			};

		case UPDATE_MEAL_PERIOD:
			let mealPeriods = state.mealPeriods.filter(mp => mp.id !== action.mealPeriod.id);
			return {
				...state,
				mealPeriods : sortByName([ ...mealPeriods, action.mealPeriod ])
			};

		case UPDATE_MEAL_PERIOD_CATEGORY:
			let mealPeriods_categories = state.mealPeriods_categories.filter(mpc => mpc.id !== action.mealPeriodCat.id);
			return {
				...state,
				mealPeriods_categories : [ ...mealPeriods_categories, action.mealPeriodCat ]
			};

		case UPDATE_RESTAURANT:
			restaurant = action.restaurant;
			return {
				...state,
				name    : restaurant.name,
				address : restaurant.address,
				phone   : restaurant.phone,
				email   : restaurant.email,
				website : restaurant.website,
				notes   : restaurant.notes
			};

		default:
			return state;
	}
}
