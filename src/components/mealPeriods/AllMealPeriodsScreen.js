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
				{active &&
				active.isAdmin && (
					<div className="ButtonGroup">
						<AddButton
							text="Add Meal Period"
							onClick={() => history.push(`/restaurants/${active.id}/meal-periods/new`)}
						/>
					</div>
				)}
				{active && <AllMealPeriods mealPeriods={active.mealPeriods} />}
			</div>
		</div>
	);
}
