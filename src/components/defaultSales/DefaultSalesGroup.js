import React, { useEffect, useState } from 'react';

import { getNameFromId } from '../../helpers/filterArrays';
import { getDayOfWeekNameFromId } from '../../helpers/filterArrays';

import DefaultSalesInputForm from './DefaultSalesInputForm';

export default function DefaultSalesGroup({ groupArray = [], mealPeriods = [], dayId, dayName }) {
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
			let mp = groupArray[i];
			valuesObject[`${mp.mealPeriodId}`] = mp.total;
		}
		setGroupValues(valuesObject);
	}, []);

	return (
		<div>
			<h3>{dayName}</h3>
			{groupArray.map(ds => {
				return (
					<DefaultSalesInputForm
						key={`${ds.mealPeriodId}`}
						mealPeriodName={getNameFromId(mealPeriods, ds.mealPeriodId)}
						dayName={dayName}
						defaultSale={ds}
						updateGroupSum={updateGroupSum}
					/>
				);
			})}
			<p>
				{getDayOfWeekNameFromId(dayId)} Total: ${Math.round(groupSum * 100) / 100}
			</p>
		</div>
	);
}
