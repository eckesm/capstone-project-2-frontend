import React, { useEffect, useState } from 'react';

import { getNameFromId } from '../../helpers/filterArrays';
import { getDayOfWeekNameFromId } from '../../helpers/filterArrays';

import DefaultSalesInputForm from './DefaultSalesInputForm';

import '../screen.css';
import './defaultSales.css';

export default function DefaultSalesGroup({ groupArray = [], mealPeriods = [], dayId, dayName, isAdmin = false }) {
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
		<div className="DefaultSalesGroup Card ShadowHover">
			<p className="SectionTitle2">{dayName}</p>
			{groupArray.map(ds => {
				return (
					<DefaultSalesInputForm
						key={`${ds.mealPeriodId}`}
						mealPeriodName={getNameFromId(mealPeriods, ds.mealPeriodId)}
						dayName={dayName}
						defaultSale={ds}
						updateGroupSum={updateGroupSum}
						isAdmin={isAdmin}
					/>
				);
			})}
			<div className="InputGroup Total">
				<label>{getDayOfWeekNameFromId(dayId)} Total:</label>
				<span>${(Math.round(groupSum * 100) / 100).toLocaleString('en-US')}</span>
			</div>
		</div>
	);
}
