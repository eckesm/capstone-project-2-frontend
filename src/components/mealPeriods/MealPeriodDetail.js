import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { getMealPeriodApi } from '../../helpers/api';
import { deleteMealPeriod } from '../../actions/mealPeriods';

import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import EditMealPeriodForm from './EditMealPeriodForm';
import GoButton from '../buttons/GoButton';

export default function MealPeriodDetail() {
	const dispatch = useDispatch();
	const history = useHistory();

	const { mealPeriodId } = useParams();
	const { active } = useSelector(store => store.restaurants);

	const [ mealPeriod, setMealPeriod ] = useState(null);
	const [ editing, setEditing ] = useState(false);

	useEffect(
		async () => {
			const res = await getMealPeriodApi(mealPeriodId);
			setMealPeriod(res.data.mealPeriod);
		},
		[ mealPeriodId ]
	);

	async function handleDelete() {
		try {
			const res = await dispatch(deleteMealPeriod(mealPeriod.id));
			if (res.status === 200) {
				history.push(`/restaurants/${mealPeriod.restaurantId}/meal-periods`);
			}
		} catch (err) {
			console.log('handleDelete() > deleteMealPeriod() error:', err);
		}
	}

	return (
		<div>
			{mealPeriod &&
			!editing && (
				<div>
					<h1>Meal Period Detail {mealPeriod.id}</h1>
					<div>
						{mealPeriod.name && <p>Name: {mealPeriod.name}</p>}
						{mealPeriod.notes && <p>Notes: {mealPeriod.notes}</p>}
					</div>
					{active &&
					active.isAdmin && (
						<div>
							{active.isAdmin && <EditButton onClick={() => setEditing(true)} text="Edit Meal Period" />}
							{active.isAdmin && <DeleteButton text="Delete Meal Period" onClick={handleDelete} />}
							<GoButton
								text="Go to All Meal Periods"
								onClick={() => history.push(`/restaurants/${mealPeriod.restaurantId}/meal-periods`)}
							/>
						</div>
					)}
				</div>
			)}

			{mealPeriod &&
			editing && (
				<div>
					<h1>Meal Period Form {mealPeriod.id}</h1>
					<EditMealPeriodForm
						id={mealPeriod.id}
						name={mealPeriod.name}
						notes={mealPeriod.notes}
						setMealPeriod={setMealPeriod}
						setEditing={setEditing}
					/>
				</div>
			)}
		</div>
	);
}
