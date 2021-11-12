import React from 'react';
import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';

import './categories.css';

export default function CategoryCard({
	id,
	restaurantId,
	name,
	catGroupId = null,
	catGroupName = null,
	cogsPercent = 0,
	notes = null
}) {
	const history = useHistory();

	return (
		<div
			className="CategoryCard Card BackgroundHover ShadowHover"
			onClick={() => history.push(`/restaurants/${restaurantId}/categories/${id}`)}
		>
			<p className="SectionTitle2">{name}</p>
			<ul className="IgnoreList Left">
				{catGroupName && (
					<li className="InputGroup">
						<label>Category Group:</label>
						{catGroupName}
					</li>
				)}
				<li className="InputGroup">
					<label>COGS Percentage:</label>
					<span>{Math.floor(cogsPercent * 10000) / 100}%</span>
				</li>
			</ul>
			{notes && (
				<div className="InputGroup">
					<label>Notes:</label>
					<span className="Notes">{notes}</span>
				</div>
			)}
		</div>
	);
}
