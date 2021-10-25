import React from 'react';

import MealPeriodCard from './MealPeriodCard';

export default function AllMealPeriods({mealPeriods = []}) {

	return (
		<div>
			{mealPeriods.map(m => {
				return (
					<MealPeriodCard key={m.id} id={m.id} restaurantId={m.restaurantId} name={m.name} notes={m.notes} />
				);
			})}
		</div>
	);
}
