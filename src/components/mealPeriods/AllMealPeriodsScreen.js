import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AllMealPeriods from './AllMealPeriods';
import AddButton from '../buttons/AddButton';

import '../screen.css';

export default function AllMealPeriodsScreen() {
	const history = useHistory();
	const active = useSelector(store => store.active);

	return (
		<div className="Window">
			<div className="Screen">
				<p className="ScreenTitle">Meal Periods</p>
				<div className="HeadingContainer">
					<div className="ButtonGroup">
						{active &&
						active.isAdmin && (
							<AddButton
								text="Add Meal Period"
								onClick={() => history.push(`/restaurants/${active.id}/meal-periods/new`)}
							/>
						)}
						{/* <GoButton text="Restaurant" onClick={() => history.push(`/restaurants/${active.id}`)} /> */}
					</div>
				</div>
				{active && <AllMealPeriods mealPeriods={active.mealPeriods} />}
			</div>
		</div>
	);
}
