import { LOGOUT_USER, STORE_USER_INFO } from '../actions/types';

const INITIAL_STATE = {
	user : null
};

export default function auth(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGOUT_USER:
			return INITIAL_STATE;
		case STORE_USER_INFO:
			const user = {
				emailAddress : action.user.emailAddress,
				firstName    : action.user.firstName,
				lastName     : action.user.lastName,
				userId       : action.user.id
			};
			return {
				...state,
				user
			};
		default:
			return state;
	}
}
