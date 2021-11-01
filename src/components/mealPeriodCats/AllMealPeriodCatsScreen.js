import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getNameFromId } from '../../helpers/filterArrays';

import MealPeriodCatsGroup from './MealPeriodCatsGroup';

export default function AllMealPeriodCatsScreen() {
	const active = useSelector(store => store.active);

	const [ mealPeriods, setMealPeriods ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ mealPeriodCats, setMealPeriodCats ] = useState({});

	function prepareMealPeriodCats(mealPeriods, categories, mealPeriodCats) {
		const preparingMealPeriodCats = {};
		for (let i = 0; i < mealPeriods.length; i++) {
			let mp = mealPeriods[i].id;
			let mpArray = [];
			for (let c = 0; c < categories.length; c++) {
				let cat = categories[c].id;
				let existing = mealPeriodCats.filter(mpc => mpc.mealPeriodId == mp && mpc.categoryId == cat)[0];
				if (existing) {
					existing.status = 'existing';
					// preparingMealPeriodCats.push(existing);
					mpArray.push(existing);
				}
				else {
					// preparingMealPeriodCats.push({
					mpArray.push({
						mealPeriodId         : mp,
						categoryId           : cat,
						salesPercentOfPeriod : '0',
						notes                : null,
						status               : 'new'
					});
				}
			}
			preparingMealPeriodCats[mp] = mpArray;
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
					// mealPeriodCats.length > 0 &&
					Object.keys(mealPeriodCats).map(mp => {
						return (
							<MealPeriodCatsGroup
								key={mp}
								groupArray={mealPeriodCats[mp]}
								mealPeriods={active.mealPeriods}
								categories={active.categories}
								mealPeriodId={mp}
								mealPeriodName={getNameFromId(active.mealPeriods, mp)}
							/>
						);

						// return c.map(mpc => {
						// 	return (
						// 		<MealPeriodCatsInputForm
						// 			key={`${mpc.mealPeriodId}-${mpc.categoryId}`}
						// 			mealPeriodName={getNameFromId(mealPeriods, mpc.mealPeriodId)}
						// 			categoryName={getNameFromId(categories, mpc.categoryId)}
						// 			mealPeriodCat={mpc}
						// 		/>
						// 	);
						// });
					})}
			</div>
		</div>
	);
}
