import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({
	id,
	restaurantId,
	name,
	catGroupId = null,
	catGroupName = null,
	cogsPercent = 0,
	notes = null
}) {
	return (
		<div>
			<h2>{name}</h2>
			<ul>
				{catGroupName && (
					<li>
						Category Group:{' '}
						<Link to={`/restaurants/${restaurantId}/category-groups/${catGroupId}`}>{catGroupName}</Link>
					</li>
				)}
				<li>COGS Percentage: {Math.floor(cogsPercent * 10000) / 100}%</li>
				{notes && <li>Notes: {notes}</li>}
			</ul>
			<Link to={`/restaurants/${restaurantId}/categories/${id}`}>Go to {name}.</Link>
			{notes && <p>{notes}</p>}
		</div>
	);
}
