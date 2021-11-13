import React, { useEffect, useState } from 'react';

import { getNameFromId } from '../../helpers/filterArrays';

import SalesInputForm from './SalesInputForm';

export default function SalesGroup({ groupArray = [], categories = [], mealPeriodName }) {
	const [ groupExpectedValues, setGroupExpectedValues ] = useState({});
	const [ groupActualValues, setGroupActualValues ] = useState({});
	const [ groupExpectedSum, setGroupExpectedSum ] = useState(0);
	const [ groupActualSum, setGroupActualSum ] = useState(0);

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

	useEffect(
		() => {
			const expectedObject = {};
			const actualObject = {};
			for (let i = 0; i < groupArray.length; i++) {
				let c = groupArray[i];
				expectedObject[c.categoryId] = c.expectedSales;
				actualObject[c.categoryId] = c.actualSales;
			}
			setGroupExpectedValues(expectedObject);
			setGroupActualValues(actualObject);
		},
		[ groupArray ]
	);

	return (
		<div className="SalesGroup Card ShadowHover">
			<p className='SectionTitle2'>{mealPeriodName}</p>
			{groupArray.map((ds, idx) => {
				return (
					<SalesInputForm
						key={`${ds.categoryId}-${ds.date}`}
						index={idx}
						mealPeriodName={mealPeriodName}
						categoryName={getNameFromId(categories, ds.categoryId)}
						dayName={getNameFromId(ds.dayId)}
						dailySale={ds}
						updateGroupExpectedSum={updateGroupExpectedSum}
						updateGroupActualSum={updateGroupActualSum}
					/>
				);
			})}
			<div className="TotalsContainer">
				<span className="Placeholder1" />
				<div className="ResultsContainer">
					<div className="Result Expected">
						<span>
							<b>Total</b>:{' '}
						</span>
						<span className="ResultFigure">
							{' '}
							${groupExpectedSum && (Math.round(groupExpectedSum * 100) / 100).toLocaleString('en-US')}
						</span>
					</div>
					<div className="Result Actual">
						<span>
							<b>Total</b>:{' '}
						</span>
						<span className="ResultFigure">
							${groupActualSum && (Math.round(groupActualSum * 100) / 100).toLocaleString('en-US')}
						</span>
					</div>
				</div>
				<span className="Placeholder2" />
			</div>
		</div>
	);
}
