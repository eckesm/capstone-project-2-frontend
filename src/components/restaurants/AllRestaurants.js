import React from 'react';

import RestaurantCard from './RestaurantCard';

export default function AllRestaurants({ restaurants, userId }) {
	return (
		<div className="AllRestaurants CardsContainer">
			{restaurants.map(r => {
				return (
					<RestaurantCard
						key={r.id}
						restaurantId={r.id}
						name={r.name}
						notes={r.notes}
						isAdmin={r.isAdmin}
						isOwner={r.ownerId === userId}
					/>
				);
			})}
		</div>
	);
}
