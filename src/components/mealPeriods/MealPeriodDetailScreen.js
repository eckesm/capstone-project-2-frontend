import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMealPeriodApi } from '../../helpers/api';

import MealPeriodDetail from './MealPeriodDetail';

import '../screen.css';

export default function MealPeriodDetailScreen() {
	const { mealPeriodId } = useParams();
	const active = useSelector(store => store.active);

	const [ mealPeriod, setMealPeriod ] = useState(null);

	useEffect(
		async () => {
			const res = await getMealPeriodApi(mealPeriodId);
			setMealPeriod(res.data.mealPeriod);
		},
		[ mealPeriodId ]
	);

	return (
		<div className="Window">
			<div className="Screen">
				{/* <div className="BasicView"> */}
					{mealPeriod && (
						<MealPeriodDetail
							mealPeriod={mealPeriod}
							isAdmin={active.isAdmin}
							setMealPeriod={setMealPeriod}
						/>
					)}
				{/* </div> */}
			</div>
		</div>
	);
}
