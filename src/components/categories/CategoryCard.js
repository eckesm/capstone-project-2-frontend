import React from 'react';
import { useHistory } from 'react-router';

import { shortenWithEllipse } from '../../helpers/textAdjustments';

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
			<p className="SectionTitle2">{shortenWithEllipse(name,30)}</p>
			<ul className="IgnoreList Left">
				{catGroupName && (
					<li className="InputGroup">
						<label>Category Group:</label>
						{shortenWithEllipse(catGroupName,35)}
					</li>
				)}
				<li className="InputGroup">
					<label>COGS Percentage:</label>
					<span>{Math.floor(cogsPercent * 10000) / 100}%</span>
				</li>
			</ul>
			{notes && (
				<div className="NotesContainer">
					<b>Notes</b>: <span className="Notes">{notes}</span>
				</div>
			)}
		</div>
	);
}
