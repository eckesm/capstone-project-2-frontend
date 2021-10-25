import React from 'react';

import RestaurantCard from './RestaurantCard';

export default function AllRestaurants({restaurants}) {

	return (
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
	);
}
