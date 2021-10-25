import {
	ADD_NEW_RESTAURANT,
	DELETE_RESTAURANT,
	LOGOUT_USER,
	STORE_USER_RESTAURANTS,
	UPDATE_RESTAURANT
} from '../actions/types';

const INITIAL_STATE = {
	restaurants : []
};
// const INITIAL_STATE = {
// 	restaurants      : [],
// 	restaurantsAdmin : [],
// 	restaurantsUser  : []
// };

function sortByName(array) {
	// https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array for help with sorting objects in an array on a property in the array
	return array.sort((a, b) => {
		var textA = a.name.toUpperCase();
		var textB = b.name.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}

export default function restaurants(state = INITIAL_STATE, action) {
	let restaurant, restaurants, restaurantsAdmin, restaurantsUser, adjustedRestaurants;

	switch (action.type) {
		case ADD_NEW_RESTAURANT:
			restaurant = action.restaurant;
			restaurantsAdmin = [ ...state.restaurantsAdmin ];
			restaurantsUser = [ ...state.restaurantsUser ];
			if (restaurant.isAdmin) restaurantsAdmin.push(restaurant.id);
			restaurantsUser.push(restaurant.id);
			return {
				...state,
				restaurants      : sortByName([ ...state.restaurants, action.restaurant ]),
				restaurantsAdmin,
				restaurantsUser
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

		case STORE_USER_RESTAURANTS:
			restaurants = sortByName(action.restaurants);
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

		case UPDATE_RESTAURANT:
			const updatedRestaurant = action.restaurant;
			restaurants = state.restaurants;
			adjustedRestaurants = [];
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
