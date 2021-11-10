import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import '../screen.css';
import './mealPeriods.css'

export default function MealPeriodCard({ id, restaurantId, name, notes = null }) {
	const history = useHistory();

	return (
		<div
			className="MealPeriodCard Card Stacked Hover"
			onClick={() => history.push(`/restaurants/${restaurantId}/meal-periods/${id}`)}
		>
			<p className="SectionTitle2">{name}</p>
			{/* <Link className='SectionTitle1' to={`/restaurants/${restaurantId}/meal-periods/${id}`}>{name}</Link> */}
			{notes && (
				<div>
					<b>Notes</b>: <span className="Notes">{notes}</span>
				</div>
			)}
		</div>
	);
}
