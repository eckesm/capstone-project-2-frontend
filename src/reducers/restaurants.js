import { ADD_NEW_RESTAURANT, LOGOUT_USER, STORE_ACTIVE_RESTAURANT, STORE_USER_RESTAURANTS } from '../actions/types';

const INITIAL_STATE = {
	active      : null,
	restaurants : []
};

export default function restaurants(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ADD_NEW_RESTAURANT:
			return {
				...state,
				restaurants : [ ...state.restaurants, action.restaurant ]
			};
		case LOGOUT_USER:
			return INITIAL_STATE;
		case STORE_ACTIVE_RESTAURANT:
			return {
				...state,
				active : action.restaurant
			};
		case STORE_USER_RESTAURANTS:
			return {
				...state,
				restaurants : action.restaurants
			};

		default:
			return state;
	}
}
