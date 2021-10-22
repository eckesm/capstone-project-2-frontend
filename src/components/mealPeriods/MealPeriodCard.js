import React from 'react';

export default function MealPeriodCard({ id, restaurantId, name, notes = null }) {
	return (
		<div>
			<h2>{name}</h2>
			<a href={`/#/restaurants/${restaurantId}/meal-periods/${id}`}>Go to {name}.</a>
			{notes && <p>{notes}</p>}
		</div>
	);
}
