import React from 'react';

import NewMealPeriodForm from './NewMealPeriodForm';

import '../screen.css';

export default function NewMealPeriodScreen() {
	return (
		<div className="Window">
			<div className="NewMealPeriodScreen Screen">
				<p className="ScreenTitle">New Meal Period</p>
				<NewMealPeriodForm />
			</div>
		</div>
	);
}
