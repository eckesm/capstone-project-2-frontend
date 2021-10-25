import React from 'react';
import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurantId, name, notes = null, isAdmin = false }) {
	return (
		<div>
			<h2>{name}</h2>
			<Link to={`/restaurants/${restaurantId}`}>Go to {name}.</Link>
			{isAdmin && <p>Administrator</p>}
			{notes && <p>{notes}</p>}
		</div>
	);
}
