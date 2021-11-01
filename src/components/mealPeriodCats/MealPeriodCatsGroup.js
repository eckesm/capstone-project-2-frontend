import React, { useEffect, useState } from 'react';

import { getNameFromId } from '../../helpers/filterArrays';

import MealPeriodCatsInputForm from './MealPeriodCatsInputForm';

export default function MealPeriodCatsGroup({ groupArray = [], mealPeriods = [], categories = [], mealPeriodId, mealPeriodName }) {
	const [ groupValues, setGroupValues ] = useState({});
	const [ groupSum, setGroupSum ] = useState();

	function updateGroupSum(id, value) {
		const updatedObject = { ...groupValues };
		updatedObject[id] = value;
		setGroupValues(updatedObject);
	}

	useEffect(
		() => {
			let sum = 0;
			Object.keys(groupValues).forEach(k => {
				sum += Number(groupValues[k]);
			});
			setGroupSum(sum);
		},
		[ groupValues ]
	);

	useEffect(() => {
		const valuesObject = {};
		for (let i = 0; i < groupArray.length; i++) {
			let mpc = groupArray[i];
			valuesObject[`${mpc.mealPeriodId}-${mpc.categoryId}`] = mpc.salesPercentOfPeriod;
		}
		setGroupValues(valuesObject);
	}, []);

	return (
		<div>
			<h3>{mealPeriodName}</h3>
			{groupArray.map(mpc => {
				return (
					<MealPeriodCatsInputForm
						key={`${mpc.mealPeriodId}-${mpc.categoryId}`}
						mealPeriodName={mealPeriodName}
						categoryName={getNameFromId(categories, mpc.categoryId)}
						mealPeriodCat={mpc}
						updateGroupSum={updateGroupSum}
					/>
				);
			})}
			<p>
				{mealPeriodName} Total: {Math.round(groupSum * 10000) / 100}%
			</p>
		</div>
	);
}
