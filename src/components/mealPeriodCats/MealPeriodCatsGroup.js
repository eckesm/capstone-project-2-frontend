import React, { useEffect, useState } from 'react';

import { getNameFromId } from '../../helpers/filterArrays';

import MealPeriodCatsInputForm from './MealPeriodCatsInputForm';

import { shortenWithEllipse } from '../../helpers/textAdjustments';

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
		<div className="MealPeriodCatsGroup">
			<p className="MealPeriodName SectionTitle2">{shortenWithEllipse(mealPeriodName, 10)}</p>
			<div className="GroupContainer">
				{groupArray.map((mpc, idx) => {
					return (
						<MealPeriodCatsInputForm
							key={`${mpc.mealPeriodId}-${mpc.categoryId}`}
							mealPeriodName={mealPeriodName}
							categoryName={getNameFromId(categories, mpc.categoryId)}
							mealPeriodCat={mpc}
							updateGroupSum={updateGroupSum}
							isAdmin={isAdmin}
							index={idx}
						/>
					);
				})}
			</div>
			<div className="Total">
				<span className={Math.round(groupSum * 10000000000) / 10000000000 === 1 ? 'Accurate' : 'Negative'}>
					{Math.round(groupSum * 10000) / 100}%
				</span>
			</div>
		</div>
	);
}
