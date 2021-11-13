import React, { useEffect, useState } from 'react';

import { getNameFromId } from '../../helpers/filterArrays';

import MealPeriodCatsInputForm from './MealPeriodCatsInputForm';

import '../screen.css';
import './mealPeriodCats.css';

export default function MealPeriodCatsGroup({ groupArray = [], categories = [], mealPeriodName, isAdmin = false }) {
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
		<div className="MealPeriodCatsGroup Card ShadowHover">
			<p className="SectionTitle2">{mealPeriodName}</p>
			{groupArray.map(mpc => {
				return (
					<MealPeriodCatsInputForm
						key={`${mpc.mealPeriodId}-${mpc.categoryId}`}
						mealPeriodName={mealPeriodName}
						categoryName={getNameFromId(categories, mpc.categoryId)}
						mealPeriodCat={mpc}
						updateGroupSum={updateGroupSum}
						isAdmin={isAdmin}
					/>
				);
			})}
			<div className="InputGroup Total">
				<label>Total:</label>
				<span className={Math.round(groupSum * 10000000000) / 10000000000 === 1 ? 'Accurate' : 'Negative'}>
					{Math.round(groupSum * 10000) / 100}%
				</span>
			</div>
		</div>
	);
}
