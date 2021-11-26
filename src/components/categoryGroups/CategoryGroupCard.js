import React from 'react';
import { useHistory } from 'react-router';

import { shortenWithEllipse } from '../../helpers/textAdjustments';

import './categoryGroups.css';
import '../screen.css';

export default function CategoryGroupCard({ id, restaurantId, name, notes = null, categories = [] }) {
	const history = useHistory();

	return (
		<div
			className="CategoryGroupCard Card BackgroundHover ShadowHover"
			onClick={() => history.push(`/restaurants/${restaurantId}/category-groups/${id}`)}
		>
			<p className="SectionTitle2">{shortenWithEllipse(name,30)}</p>
			{categories.length > 0 && (
				<ul className="IgnoreList Centered">
					{categories.map(c => {
						return <li key={c.id}>{shortenWithEllipse(c.name,30)}</li>;
					})}
				</ul>
			)}
			{notes && (
				<div className="NotesContainer">
					<b>Notes</b>: <span className="Notes">{notes}</span>
				</div>
			)}
		</div>
	);
}
