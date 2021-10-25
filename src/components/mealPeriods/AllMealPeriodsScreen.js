import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AllMealPeriods from './AllMealPeriods';
import AddButton from '../buttons/AddButton';
import GoButton from '../buttons/GoButton';

export default function AllMealPeriodsScreen() {
	const history = useHistory();
	const active = useSelector(store => store.active);

	return (
		<div>
			<div>
				<h1>Meal Periods</h1>
				{active &&
				active.isAdmin && (
					<AddButton
						text="Add Meal Period"
						onClick={() => history.push(`/restaurants/${active.id}/meal-periods/new`)}
					/>
				)}
				<GoButton text="Restaurant" onClick={() => history.push(`/restaurants/${active.id}`)} />
			</div>
			{active && <AllMealPeriods mealPeriods={active.mealPeriods} />}
		</div>
	);
}
