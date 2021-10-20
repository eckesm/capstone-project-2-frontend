import React from 'react';
import { useSelector } from 'react-redux';

import RestaurantCard from './RestaurantCard';

export default function AllRestaurants() {
	const { restaurants } = useSelector(store => store.restaurants);

	return (
		<div>
			<h1>My Restaurants</h1>
			{restaurants.map(r => {
				return <RestaurantCard key={r.id} id={r.id} name={r.name} isAdmin={r.isAdmin} />;
			})}
		</div>
	);
}
