import React from 'react';

export default function RestaurantCard({ id, name, isAdmin }) {
	return (
		<div>
			<h2>{name}</h2>
			<a href={`/#/restaurants/${id}`}>Go to {name}.</a>
            {isAdmin && <p>Administrator</p>}
		</div>
	);
}
