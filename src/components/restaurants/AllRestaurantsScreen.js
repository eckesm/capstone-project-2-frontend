import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { removeActiveRestaurant } from '../../actions/restaurants';

import AllRestaurants from '../restaurants/AllRestaurants';
import GoButton from '../buttons/GoButton';

import '../screen.css';

export default function AllRestaurantsScreen() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { restaurants } = useSelector(store => store.restaurants);
	const { user } = useSelector(store => store.auth);

	useEffect(() => {
		dispatch(removeActiveRestaurant());
	}, []);

	return (
		<div className="Window">
			<div className="AllRestaurantsScreen Screen">
				<p className="ScreenTitle">My Restaurants</p>
				<div>
					{restaurants &&
					restaurants.length === 0 && (
						<h3>You don't have any restaurants yet... would you like to add one?</h3>
					)}
					<GoButton text="Add Restaurant" onClick={() => history.push(`/restaurants/new`)} />
				</div>
				{restaurants && user && <AllRestaurants restaurants={restaurants} userId={user.userId} />}
			</div>
		</div>
	);
}
