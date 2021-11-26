import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { sortByObjectAttribute } from '../../helpers/sorting';
import { prepareMealPeriodCats } from '../../helpers/mealPeriodCatsCalculations';

import MealPeriodCatsGroup from './MealPeriodCatsGroup';

import { shortenWithEllipse } from '../../helpers/textAdjustments';

import './mealPeriodCats.css'
import '../screen.css'

export default function AllMealPeriodCatsScreen() {
	const active = useSelector(store => store.active);
	const [ mealPeriodCats, setMealPeriodCats ] = useState([]);

	useEffect(
		() => {
			if (active && active.mealPeriods.length > 0 && active.categories.length > 0) {
				const preparedArray = prepareMealPeriodCats(
					active.mealPeriods,
					active.categories,
					active.mealPeriod_categories
				);
				setMealPeriodCats(sortByObjectAttribute('name', preparedArray));
			}
		},
		[ active ]
	);

	function determineDivClassName(index) {
		if (index === 0) {
			return `MealPeriodCatsInputForm First`;
		}
		else {
			if (index % 2 === 0) {
				return `MealPeriodCatsInputForm Even`;
			}
			else {
				return `MealPeriodCatsInputForm Odd`;
			}
		}
	}

	return (
		<div className="Window">
			<div className="AllMealPeriodCatsScreen Screen">
				<p className="ScreenTitle">Sales Percentages by Meal Periods & Category</p>
				<div className="AllContainer">
					<div className="CategoryColumn">
						<p className="MealPeriodName SectionTitle2">Category</p>
						<ul className="IgnoreList">
							{active &&
								active.categories.map((cat, idx) => {
									return (
										<li key={`${cat.id}`} className={determineDivClassName(idx)}>
											{shortenWithEllipse(cat.name,25)}
										</li>
									);
								})}
							<li className="TotalHeader" key={'total'}>
								Total
							</li>
						</ul>
					</div>

					{active &&
						mealPeriodCats.map(mpc => {
							return (
								<MealPeriodCatsGroup
									key={mpc.id}
									groupArray={mpc.categories}
									categories={active.categories}
									mealPeriodName={mpc.name}
									isAdmin={active.isAdmin}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}
