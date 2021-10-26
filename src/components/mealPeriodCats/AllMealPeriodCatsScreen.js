import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getNameFromId, getDayOfWeekNameFromId } from '../../helpers/filterArrays';

import MealPeriodCatsInputForm from './MealPeriodCatsInputForm';

export default function AllMealPeriodCatsScreen() {
	const active = useSelector(store => store.active);

	const [ mealPeriods, setMealPeriods ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ mealPeriodCats, setMealPeriodCats ] = useState([]);

	function prepareMealPeriodCats(mealPeriods, categories, mealPeriodCats) {
		const preparingMealPeriodCats = [];
		for (let i = 0; i < mealPeriods.length; i++) {
			let mp = mealPeriods[i].id;
			for (let c = 0; c < categories.length; c++) {
				let cat = categories[c].id;
				let existing = mealPeriodCats.filter(mpc => mpc.mealPeriodId == mp && mpc.categoryId == cat)[0];
				if (existing) {
					existing.status = 'existing';
					preparingMealPeriodCats.push(existing);
				}
				else {
					preparingMealPeriodCats.push({
						mealPeriodId         : mp,
						categoryId           : cat,
						salesPercentOfPeriod : '0',
						notes                : null,
						status               : 'new'
					});
				}
			}
		}
		setMealPeriodCats(preparingMealPeriodCats);
	}

	useEffect(
		() => {
			if (active && mealPeriods.length === 0) {
				setMealPeriods(active.mealPeriods);
			}
			if (active && categories.length === 0) {
				setCategories(active.categories);
			}
		},
		[ active ]
	);

	useEffect(
		() => {
			if (active && mealPeriods.length > 0 && categories.length > 0) {
				prepareMealPeriodCats(mealPeriods, categories, active.mealPeriod_categories);
			}
		},
		[ mealPeriods, categories, active ]
	);

	return (
		<div>
			<h1>Sales Percentages by Meal Periods & Category</h1>
			<div>
				{active &&
					mealPeriodCats.map(mpc => {
						return (
							<MealPeriodCatsInputForm
								key={`${mpc.mealPeriodId}-${mpc.categoryId}`}
								mealPeriodName={getNameFromId(mealPeriods, mpc.mealPeriodId)}
								categoryName={getNameFromId(categories, mpc.categoryId)}
								mealPeriodCat={mpc}
							/>
						);
					})}
			</div>
		</div>
	);
}
