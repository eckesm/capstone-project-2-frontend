import React from 'react';
import { useHistory } from 'react-router';

import { shortenWithEllipse } from '../../helpers/textAdjustments';

import '../screen.css';
import './mealPeriods.css';

export default function MealPeriodCard({ id, restaurantId, name, notes = null }) {
	const history = useHistory();

	return (
		<div
			className="MealPeriodCard Card BackgroundHover ShadowHover"
			onClick={() => history.push(`/restaurants/${restaurantId}/meal-periods/${id}`)}
		>
			<p className="SectionTitle2">{shortenWithEllipse(name,30)}</p>
			{notes && (
				<div className="NotesContainer">
					<b>Notes</b>: <span className="Notes">{notes}</span>
				</div>
			)}
		</div>
	);
}
