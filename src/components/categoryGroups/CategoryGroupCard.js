import React from 'react';

export default function CategoryGroupCard({ id, restaurantId, name, notes = null }) {
	return (
		<div>
			<h2>{name}</h2>
			<a href={`/#/restaurants/${restaurantId}/category-groups/${id}`}>Go to {name}.</a>
			{notes && <p>{notes}</p>}
		</div>
	);
}
