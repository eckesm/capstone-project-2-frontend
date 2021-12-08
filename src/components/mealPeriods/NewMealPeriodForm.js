import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerMealPeriod } from '../../actions/mealPeriods';

import AddButton from '../buttons/AddButton';
import CancelButton from '../buttons/CancelButton';
import ErrorMessages from '../errorMessages/ErrorMessages';

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

	const [ errors, setErrors ] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerMealPeriod(active.id, formData));
			if (res.status === 201) {
				history.push(`/restaurants/${active.id}/meal-periods`);
			}
			else if (res.status === 400) {
				setErrors(res.message);
			}
			else {
				console.log(res);
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
				<AddButton text="Add Meal Period" />
				{active && (
					<CancelButton
						text="Don't Add"
						onClick={() => history.push(`/restaurants/${active.id}/meal-periods`)}
					/>
				)}
				<ErrorMessages errors={errors} />
			</div>
		</form>
	);
}
