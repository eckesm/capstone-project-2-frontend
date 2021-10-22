import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import RestaurantCard from './RestaurantCard';
import AddButton from '../buttons/AddButton';

export default function AllRestaurants() {
	const history = useHistory();
	const { restaurants } = useSelector(store => store.restaurants);

	return (
		<div>
			<h1>My Restaurants</h1>
			<div>
				{restaurants.map(r => {
					return (
						<RestaurantCard
							key={r.id}
							restaurantId={r.id}
							name={r.name}
							notes={r.notes}
							isAdmin={r.isAdmin}
						/>
					);
				})}
			</div>
			<AddButton text="Add New Restaurant" onClick={() => history.push('/restaurants/new')} />
		</div>
	);
}
