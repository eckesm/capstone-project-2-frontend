import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { deleteMealPeriod } from '../../actions/mealPeriods';

import EditButton from '../buttons/EditButton';
import EditMealPeriodForm from './EditMealPeriodForm';
import GoButton from '../buttons/GoButton';
import ConfirmDangerModalButton from '../buttons/ConfirmDangerModalButton';

export default function MealPeriodDetail({ mealPeriod, isAdmin = false, setMealPeriod }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const [ editing, setEditing ] = useState(false);

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
		<div className="MealPeriodDetail">
			{!editing && (
				<div className="BasicView">
					<p className="ScreenTitle">{mealPeriod.name}</p>
					{mealPeriod.notes && (
						<div className="NotesContainer">
							<b>Notes</b>: <span className="Notes">{mealPeriod.notes}</span>
						</div>
					)}
					<div className="ButtonGroup">
						{isAdmin && <EditButton onClick={() => setEditing(true)} text="Edit Meal Period" />}
						{isAdmin && (
							<ConfirmDangerModalButton
								onConfirm={handleDelete}
								text="Delete Meal Period"
								confirmText={
									'Are you sure you would like to delete meal period?  This action cannot be undone.'
								}
								confirmButtonText="Confirm Delete"
							/>
						)}
						<GoButton
							text="All Meal Periods"
							onClick={() => history.push(`/restaurants/${mealPeriod.restaurantId}/meal-periods`)}
						/>
					</div>
				</div>
			)}

			{mealPeriod &&
			editing && (
				<div className="FullFormContainer">
					<p className="ScreenTitle">Edit Meal Period</p>
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
