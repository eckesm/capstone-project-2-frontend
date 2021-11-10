import {
	ADD_CATEGORY,
	ADD_CATEGORY_GROUP,
	ADD_DEFAULT_SALE,
	ADD_MEAL_PERIOD,
	ADD_MEAL_PERIOD_CATEGORY,
	ADD_USER_TO_RESTAURANT,
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
	// https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array for help with sorting objects in an array on a property in the array
	return array.sort((a, b) => {
		var textA = a.name.toUpperCase();
		var textB = b.name.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}

export default function active(state = INITIAL_STATE, action) {
	let categories,
		catGroups,
		defaultSales,
		mealPeriods,
		mealPeriod_categories,
		restaurant,
		adjustedCategories,
		adjustedCatGroups,
		adjustedDefaultSales,
		adjustedMealPeriods,
		adjustedMealPeriodCats;

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
			const updatedCategory = action.category;
			categories = state.categories;
			adjustedCategories = [];
			for (let i = 0; i < categories.length; i++) {
				if (categories[i].id === updatedCategory.id) {
					adjustedCategories.push(updatedCategory);
				}
				else {
					adjustedCategories.push(categories[i]);
				}
			}
			return {
				...state,
				categories : sortByName(adjustedCategories)
			};

		case UPDATE_CATEGORY_GROUP:
			const updatedCatGroup = action.catGroup;
			catGroups = state.catGroups;
			adjustedCatGroups = [];
			for (let i = 0; i < catGroups.length; i++) {
				if (catGroups[i].id === updatedCatGroup.id) {
					adjustedCatGroups.push(updatedCatGroup);
				}
				else {
					adjustedCatGroups.push(catGroups[i]);
				}
			}
			return {
				...state,
				catGroups : sortByName(adjustedCatGroups)
			};

		case UPDATE_DEFAULT_SALE:
			const updatedDefaultSale = action.defaultSale;
			defaultSales = state.defaultSales;
			adjustedDefaultSales = [];
			for (let i = 0; i < defaultSales.length; i++) {
				if (defaultSales[i].id === updatedDefaultSale.id) {
					adjustedDefaultSales.push(updatedDefaultSale);
				}
				else {
					adjustedDefaultSales.push(defaultSales[i]);
				}
			}
			return {
				...state,
				defaultSales : adjustedDefaultSales
			};

		case UPDATE_MEAL_PERIOD:
			const updatedMealPeriod = action.mealPeriod;
			mealPeriods = state.mealPeriods;
			adjustedMealPeriods = [];
			for (let i = 0; i < mealPeriods.length; i++) {
				if (mealPeriods[i].id === updatedMealPeriod.id) {
					adjustedMealPeriods.push(updatedMealPeriod);
				}
				else {
					adjustedMealPeriods.push(mealPeriods[i]);
				}
			}
			return {
				...state,
				mealPeriods : sortByName(adjustedMealPeriods)
			};

		case UPDATE_MEAL_PERIOD_CATEGORY:
			const updatedMealPeriodCat = action.mealPeriodCat;
			mealPeriod_categories = state.mealPeriod_categories;
			adjustedMealPeriodCats = [];
			for (let i = 0; i < mealPeriod_categories.length; i++) {
				if (mealPeriod_categories[i].id === updatedMealPeriodCat.id) {
					adjustedMealPeriodCats.push(updatedMealPeriodCat);
				}
				else {
					adjustedMealPeriodCats.push(mealPeriod_categories[i]);
				}
			}
			return {
				...state,
				mealPeriod_categories : adjustedMealPeriodCats
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
