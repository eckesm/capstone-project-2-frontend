import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import '../screen.css';
import './mealPeriods.css'

export default function MealPeriodCard({ id, restaurantId, name, notes = null }) {
	const history = useHistory();

	return (
		<div
			className="MealPeriodCard Card Stacked BackgroundHover ShadowHover"
			onClick={() => history.push(`/restaurants/${restaurantId}/meal-periods/${id}`)}
		>
			<p className="SectionTitle2">{name}</p>
			{notes && (
				<div className='Left'>
					<b>Notes</b>: <span className="Notes">{notes}</span>
				</div>
			)}
		</div>
	);
}
