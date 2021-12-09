import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDayOfWeekNameFromId } from '../../helpers/filterArrays';

import DefaultSalesGroup from './DefaultSalesGroup';

import { shortenWithEllipse } from '../../helpers/textAdjustments';

import '../screen.css'
import './defaultSales.css';

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
					dOfWArray.push(existing);
				}
				else {
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

	function determineDivClassName(index) {
		if (index === 0) {
			return `DefaultSalesInputForm First`;
		}
		else {
			if (index % 2 === 0) {
				return `DefaultSalesInputForm Even`;
			}
			else {
				return `DefaultSalesInputForm Odd`;
			}
		}
	}

	return (
		<div className="Window">
			<div className="AllDefaultSalesScreen Screen">
				<p className="ScreenTitle">Default Sales by Day & Meal Period</p>
				<div className="AllContainer">
					<div className="MealPeriodColumn">
						<p className="DayName SectionTitle2">Meal Period</p>
						<ul className="IgnoreList">
							{mealPeriods.map((mp,idx) => {
								return <li key={`${mp.id}`} className={determineDivClassName(idx)}>
									{shortenWithEllipse(mp.name,15)}
								</li>;
							})}
							<li className="TotalHeader" key={'total'}>
								Total
							</li>
						</ul>
					</div>
					{active &&
						Object.keys(defaultSales).map(ds => {
							return (
								<DefaultSalesGroup
									key={ds}
									groupArray={defaultSales[ds]}
									mealPeriods={active.mealPeriods}
									dayId={ds}
									dayName={getDayOfWeekNameFromId(ds)}
									isAdmin={active.isAdmin}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}
