import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { removeActiveRestaurant } from '../../actions/restaurants';

import AllRestaurants from '../restaurants/AllRestaurants';
import AddButton from '../buttons/AddButton';

export default function AllRestaurantsScreen() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { restaurants } = useSelector(store => store.restaurants);

	useEffect(() => {
		dispatch(removeActiveRestaurant());
	}, []);

	return (
		<div>
			<h1>My Restaurants</h1>
			<div>
				{restaurants &&
				restaurants.length === 0 && <h3>You don't have any restaurants yet... would you like to add one?</h3>}
				<AddButton text="Add Restaurant" onClick={() => history.push(`/restaurants/new`)} />
			</div>
			{restaurants && <AllRestaurants restaurants={restaurants} />}
		</div>
	);
}
