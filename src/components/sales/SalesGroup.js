import React, { useEffect, useState } from 'react';

import { getNameFromId } from '../../helpers/filterArrays';

import SalesInputForm from './SalesInputForm';

export default function SalesGroup({
	groupArray = [],
	categories = [],
	mealPeriodName
}) {
	const [ groupExpectedValues, setGroupExpectedValues ] = useState({});
	const [ groupActualValues, setGroupActualValues ] = useState({});
	const [ groupExpectedSum, setGroupExpectedSum ] = useState();
	const [ groupActualSum, setGroupActualSum ] = useState();

	function updateGroupExpectedSum(id, value) {
		const updatedObject = { ...groupExpectedValues };
		updatedObject[id] = value;
		setGroupExpectedValues(updatedObject);
	}
	function updateGroupActualSum(id, value) {
		const updatedObject = { ...groupActualValues };
		updatedObject[id] = value;
		setGroupActualValues(updatedObject);
	}

	useEffect(
		() => {
			let sum = 0;
			Object.keys(groupExpectedValues).forEach(k => {
				sum += Number(groupExpectedValues[k]);
			});
			setGroupExpectedSum(sum);
		},
		[ groupExpectedValues ]
	);

	useEffect(
		() => {
			let sum = 0;
			Object.keys(groupActualValues).forEach(k => {
				sum += Number(groupActualValues[k]);
			});
			setGroupActualSum(sum);
		},
		[ groupActualValues ]
	);

	useEffect(() => {
		const expectedObject = {};
		const actualObject = {};
		for (let i = 0; i < groupArray.length; i++) {
			let c = groupArray[i];
			expectedObject[c.categoryId] = c.expectedSales;
			actualObject[c.categoryId] = c.actualSales;
		}
		setGroupExpectedValues(expectedObject);
		setGroupActualValues(actualObject);
	}, []);

	return (
		<div>
			<h3>{mealPeriodName}</h3>
			{groupArray.map(ds => {
				return (
					<SalesInputForm
						key={`${ds.categoryId}-${ds.date}`}
						mealPeriodName={mealPeriodName}
						categoryName={getNameFromId(categories, ds.categoryId)}
						dayName={getNameFromId(ds.dayId)}
						dailySale={ds}
						updateGroupExpectedSum={updateGroupExpectedSum}
						updateGroupActualSum={updateGroupActualSum}
					/>
				);
			})}
			<p>
				{mealPeriodName} Expected: ${Math.round(groupExpectedSum * 100) / 100}
			</p>
			<p>
				{mealPeriodName} Actual: ${Math.round(groupActualSum * 100) / 100}
			</p>
		</div>
	);
}
