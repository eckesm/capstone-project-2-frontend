import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerMealPeriod } from '../../actions/mealPeriods';

import SubmitButton from '../buttons/SubmitButton';
import CancelButton from '../buttons/CancelButton';

import './mealPeriods.css';

export default function NewMealPeriodForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const active = useSelector(store => store.active);

	const initialState = {
		name  : '',
		notes : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerMealPeriod(active.id, formData));
			if (res.status === 201) {
				history.push(`/restaurants/${active.id}/meal-periods`);
			}
		} catch (err) {
			console.log('handleSubmit() > registerMealPeriod() error:', err);
		}
	}

	return (
		<form className="NewMealPeriodForm BasicView" onSubmit={handleSubmit}>
			<div className="InputGroup">
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" value={formData.name} name="name" onChange={handleChange} required />
			</div>
			<div className="InputGroup">
				<label htmlFor="notes">Notes:</label>
				<textarea
					type="text"
					rows="5"
					cols="50"
					id="notes"
					value={formData.notes}
					name="notes"
					onChange={handleChange}
				/>
			</div>
			<div className="ButtonGroup">
				<SubmitButton text="Add Meal Period" />
				{active && (
					<CancelButton
						text="Don't Add"
						onClick={() => history.push(`/restaurants/${active.id}/meal-periods`)}
					/>
				)}
			</div>
		</form>
	);
}
