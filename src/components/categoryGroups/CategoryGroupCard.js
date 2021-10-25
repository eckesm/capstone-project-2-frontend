import React from 'react';

import { Link } from 'react-router-dom';

export default function CategoryGroupCard({ id, restaurantId, name, notes = null, categories = [] }) {
	return (
		<div>
			<h2>{name}</h2>
			<ul>
				<Link to={`/restaurants/${restaurantId}/category-groups/${id}`}>Go to {name}.</Link>
				{categories.length > 0 && (
					<ul>
						{categories.map(c => {
							return (
								<li key={c.id}>
									<Link to={`/restaurants/${c.restaurantId}/categories/${c.id}`}>{c.name}</Link>
								</li>
							);
						})}
					</ul>
				)}
				{notes && <li>{notes}</li>}
			</ul>
		</div>
	);
}
