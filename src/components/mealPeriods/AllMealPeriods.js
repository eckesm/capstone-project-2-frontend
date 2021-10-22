import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import MealPeriodCard from './MealPeriodCard';
import AddButton from '../buttons/AddButton';
import GoButton from '../buttons/GoButton';

export default function AllMealPeriods() {
	const history = useHistory();

	const { active } = useSelector(store => store.restaurants);

	return (
		<div>
			{active &&
				active.mealPeriods.map(m => {
					return (
						<MealPeriodCard
							key={m.id}
							id={m.id}
							restaurantId={m.restaurantId}
							name={m.name}
							notes={m.notes}
						/>
					);
				})}
			<AddButton
				text="Add Meal Period"
				onClick={() => history.push(`/restaurants/${active.id}/meal-periods/new`)}
			/>
			<GoButton text="Go to Restaurant" onClick={() => history.push(`/restaurants/${active.id}`)} />
		</div>
	);
}
