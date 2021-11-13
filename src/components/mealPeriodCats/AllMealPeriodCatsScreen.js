import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { sortByObjectAttribute } from '../../helpers/sorting';
import { prepareMealPeriodCats } from '../../helpers/mealPeriodCatsCalculations';

import MealPeriodCatsGroup from './MealPeriodCatsGroup';

export default function AllMealPeriodCatsScreen() {
	const active = useSelector(store => store.active);
	const [ mealPeriodCats, setMealPeriodCats ] = useState([]);

	useEffect(
		() => {
			if (active && active.mealPeriods.length > 0 && active.categories.length > 0) {
				const preparedArray = prepareMealPeriodCats(
					active.mealPeriods,
					active.categories,
					active.mealPeriod_categories
				);
				setMealPeriodCats(sortByObjectAttribute('name', preparedArray));
			}
		},
		[ active ]
	);

	return (
		<div className="Window">
			<div className="AllMealPeriodCatsScreen Screen">
				<p className='ScreenTitle'>Sales Percentages by Meal Periods & Category</p>
				<div className='CardsContainer'>
					{active &&
						mealPeriodCats.map(mp => {
							return (
								<MealPeriodCatsGroup
									key={mp.id}
									groupArray={mp.categories}
									categories={active.categories}
									mealPeriodName={mp.name}
									isAdmin={active.isAdmin}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}
