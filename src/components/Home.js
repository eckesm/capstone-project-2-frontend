import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { logoutUser } from '../actions/auth';
// import AllRestaurants from './restaurants/AllRestaurants';

export default function Home() {
	const dispatch = useDispatch();
	const { user } = useSelector(store => store.auth);
	const { restaurants } = useSelector(store => store.restaurants);
	const history = useHistory();

	return (
		<div>
			<h1>Home</h1>
			{user && <button onClick={() => dispatch(logoutUser())}>Logout</button>}

			{user && <button onClick={() => history.push('/restaurants/new')}>Add Restaurant</button>}

			{user &&
			restaurants &&
			restaurants.length > 0 && <button onClick={() => history.push('/restaurants')}>My Restaurants</button>}

			{!user && <button onClick={() => history.push('/login')}>Login</button>}
		</div>
	);
}
