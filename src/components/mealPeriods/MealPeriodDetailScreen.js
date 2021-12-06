import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BackendApi } from '../../api/api';

import MealPeriodDetail from './MealPeriodDetail';

import '../screen.css';

export default function MealPeriodDetailScreen() {
	const { mealPeriodId } = useParams();
	const active = useSelector(store => store.active);

	const [ mealPeriod, setMealPeriod ] = useState(null);

	useEffect(
		async () => {
			const res = await BackendApi.getMealPeriodApi(mealPeriodId);
			setMealPeriod(res.data.mealPeriod);
		},
		[ mealPeriodId ]
	);

	return (
		<div className="Window">
			<div className="Screen">
				{mealPeriod && (
					<MealPeriodDetail mealPeriod={mealPeriod} isAdmin={active.isAdmin} setMealPeriod={setMealPeriod} />
				)}
			</div>
		</div>
	);
}
