import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDayOfWeekNameFromId } from '../../helpers/filterArrays';

import DefaultSalesGroup from './DefaultSalesGroup';

export default function AllDefaultSalesScreen() {
	const active = useSelector(store => store.active);

	const [ mealPeriods, setMealPeriods ] = useState([]);
	const [ defaultSales, setDefaultSales ] = useState({});

	function prepareDefaultSales(mealPeriods, defaultSales, restaurantId) {
		const preparingDefaultSales = {};
		for (let dOfW = 1; dOfW <= 7; dOfW++) {
			let dOfWArray = [];
			for (let i = 0; i < mealPeriods.length; i++) {
				let mp = mealPeriods[i].id;
				let existing = defaultSales.filter(ds => ds.dayId == dOfW && ds.mealPeriodId == mp)[0];
				if (existing) {
					existing.status = 'existing';
					// preparingDefaultSales.push(existing);
					dOfWArray.push(existing);
				}
				else {
					// preparingDefaultSales.push({
					dOfWArray.push({
						id           : null,
						dayId        : dOfW,
						mealPeriodId : mp,
						notes        : null,
						restaurantId : restaurantId,
						total        : '0',
						status       : 'new'
					});
				}
			}
			preparingDefaultSales[dOfW] = dOfWArray;
		}
		setDefaultSales(preparingDefaultSales);
	}

	useEffect(
		() => {
			if (active && mealPeriods.length === 0) {
				setMealPeriods(active.mealPeriods);
			}
		},
		[ active ]
	);

	useEffect(
		() => {
			if (mealPeriods.length > 0) {
				prepareDefaultSales(mealPeriods, active.defaultSales, active.id);
			}
		},
		[ mealPeriods, active ]
	);

	return (
		<div>
			<h1>Default Sales by Day & Meal Period</h1>
			<div>
				{active &&
					Object.keys(defaultSales).map(ds => {
						// defaultSales[d].map(ds => {
						return (
							<DefaultSalesGroup
								key={ds}
								groupArray={defaultSales[ds]}
								mealPeriods={active.mealPeriods}
								dayId={ds}
								dayName={getDayOfWeekNameFromId(ds)}
							/>
						);
						// });

						// return (
						// 	<DefaultSalesInputForm
						// 		// key={uuid()}
						// 		key={`${ds.dayId}-${ds.mealPeriodId}`}
						// 		mealPeriodName={getNameFromId(mealPeriods, ds.mealPeriodId)}
						// 		dayName={getDayOfWeekNameFromId(ds.dayId)}
						// 		defaultSale={ds}
						// 	/>
						// );
					})}
			</div>
		</div>
	);
}
