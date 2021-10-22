import React from 'react';

export default function RestaurantCard({ restaurantId, name, notes = null, isAdmin = false }) {
	return (
		<div>
			<h2>{name}</h2>
			<a href={`/#/restaurants/${restaurantId}`}>Go to {name}.</a>
			{isAdmin && <p>Administrator</p>}
			{notes && <p>{notes}</p>}
		</div>
	);
}
