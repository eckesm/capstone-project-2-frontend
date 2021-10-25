import React from 'react';
import { Link } from 'react-router-dom';

export default function MealPeriodCard({ id, restaurantId, name, notes = null }) {
	return (
		<div>
			<h2>{name}</h2>
			<Link to={`/restaurants/${restaurantId}/meal-periods/${id}`}>Go to {name}.</Link>
			{notes && <p>{notes}</p>}
		</div>
	);
}
