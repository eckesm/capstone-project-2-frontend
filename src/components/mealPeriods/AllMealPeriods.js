import React from 'react';

import MealPeriodCard from './MealPeriodCard';

import '../screen.css'

export default function AllMealPeriods({mealPeriods = []}) {

	return (
		<div className='CardsContainer Stacked'>
			{mealPeriods.map(m => {
				return (
					<MealPeriodCard key={m.id} id={m.id} restaurantId={m.restaurantId} name={m.name} notes={m.notes} />
				);
			})}
		</div>
	);
}
