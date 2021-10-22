import {
	ADD_MEAL_PERIOD,
	ADD_NEW_RESTAURANT,
	DELETE_MEAL_PERIOD,
	DELETE_RESTAURANT,
	LOGOUT_USER,
	STORE_ACTIVE_RESTAURANT,
	STORE_USER_RESTAURANTS,
	UPDATE_MEAL_PERIOD,
	UPDATE_RESTAURANT
} from '../actions/types';

const INITIAL_STATE = {
	active           : null,
	// activeAccess     : null,
	restaurants      : [],
	restaurantsAdmin : [],
	restaurantsUser  : []
};

export default function restaurants(state = INITIAL_STATE, action) {
	let mealPeriod,
		mealPeriods,
		restaurant,
		restaurants,
		restaurantsAdmin,
		restaurantsUser,
		adjustedMealPeriods,
		adjustedRestaurants;

	switch (action.type) {
		case ADD_MEAL_PERIOD:
			return {
				...state,
				active : { ...state.active, mealPeriods: [ ...state.active.mealPeriods, action.mealPeriod ] }
			};

		case ADD_NEW_RESTAURANT:
			restaurant = action.restaurant;
			restaurantsAdmin = [ ...state.restaurantsAdmin ];
			restaurantsUser = [ ...state.restaurantsUser ];
			if (restaurant.isAdmin) restaurantsAdmin.push(restaurant.id);
			restaurantsUser.push(restaurant.id);
			return {
				...state,
				restaurants      : [ ...restaurants, action.restaurant ],
				restaurantsAdmin,
				restaurantsUser
			};

		case DELETE_MEAL_PERIOD:
			const deletedMealPeriodId = Number(action.deleted);
			return {
				...state,
				active : {
					...state.active,
					mealPeriods: state.active.mealPeriods.filter(m => m.id !== deletedMealPeriodId)
				}
			};

		case DELETE_RESTAURANT:
			const deletedRestaurantId = Number(action.deleted);

			return {
				...state,
				active           : null,
				restaurants      : state.restaurants.filter(r => r.id !== deletedRestaurantId),
				restaurantsAdmin : [ ...state.restaurantsAdmin ].filter(r => r !== deletedRestaurantId),
				restaurantsUser  : [ ...state.restaurantsUser ].filter(r => r !== deletedRestaurantId)
			};

		case LOGOUT_USER:
			return INITIAL_STATE;

		case STORE_ACTIVE_RESTAURANT:
			// let access = 'user';
			restaurant = action.restaurant;
			// if (restaurant.isAdmin) access = 'admin';
			if (restaurant.id)
				return {
					...state,
					active : restaurant
					// activeAccess : access
				};

		case STORE_USER_RESTAURANTS:
			restaurants = action.restaurants;
			restaurantsAdmin = [];
			restaurantsUser = [];
			for (let i = 0; i < restaurants.length; i++) {
				if (restaurants[i].isAdmin) restaurantsAdmin.push(restaurants[i].id);
				restaurantsUser.push(restaurants[i].id);
			}
			return {
				...state,
				restaurants,
				restaurantsAdmin,
				restaurantsUser
			};

		case UPDATE_MEAL_PERIOD:
			const updatedMealPeriod = action.mealPeriod;
			mealPeriods = state.active.mealPeriods;
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
				active : { ...state.active, mealPeriods: adjustedMealPeriods }
			};

		case UPDATE_RESTAURANT:
			const updatedRestaurant = action.restaurant;
			for (let i = 0; i < restaurants.length; i++) {
				if (restaurants[i].id === updatedRestaurant.id) {
					adjustedRestaurants.push(updatedRestaurant);
				}
				else {
					adjustedRestaurants.push(restaurants[i]);
				}
			}
			return {
				...state,
				active : {
					...state.active,
					name    : updatedRestaurant.name,
					address : updatedRestaurant.address,
					phone   : updatedRestaurant.phone,
					email   : updatedRestaurant.email,
					website : updatedRestaurant.website,
					notes   : updatedRestaurant.notes
				}
			};

		default:
			return state;
	}
}
