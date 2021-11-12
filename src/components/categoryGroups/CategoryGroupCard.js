import React from 'react';
import { useHistory } from 'react-router';

import './categoryGroups.css';
import '../screen.css';

export default function CategoryGroupCard({ id, restaurantId, name, notes = null, categories = [] }) {
	const history = useHistory();

	return (
		<div
			className="CategoryGroupCard Card BackgroundHover ShadowHover"
			onClick={() => history.push(`/restaurants/${restaurantId}/category-groups/${id}`)}
		>
			<p className="SectionTitle2">{name}</p>
			{categories.length > 0 && (
				<ul className="IgnoreList Centered">
					{categories.map(c => {
						return <li>{c.name}</li>;
					})}
				</ul>
			)}
			{notes && (
				<div className="InputGroup Left">
					<label>Notes:</label>
					<span className="Notes">{notes}</span>
				</div>
			)}
		</div>
	);
}
