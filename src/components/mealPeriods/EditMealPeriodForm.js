import React from 'react';
import { useDispatch } from 'react-redux';

import useFields from '../../hooks/useFields';

import { updateMealPeriod } from '../../actions/mealPeriods';

import CancelButton from '../buttons/EditButton';

export default function EditMealPeriodForm({ id, name, notes, setMealPeriod, setEditing }) {
	const dispatch = useDispatch();

	const initialState = {
		name  : name,
		notes : notes === null ? '' : notes
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(updateMealPeriod(id, formData));
			if (res.status === 200) {
				setMealPeriod(res.data.mealPeriod);
				setEditing(false);
			}
		} catch (err) {
			console.log('handleSubmit() > updateMealPeriod() error:', err);
		}
	}

	function handleCancel(evt) {
		evt.preventDefault();
		setEditing(false);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" value={formData.name} name="name" onChange={handleChange} required />
				</div>
				<div>
					<label htmlFor="notes">Notes:</label>
					<input type="text" id="notes" value={formData.notes} name="notes" onChange={handleChange} />
				</div>
				<button type="submit">Update Meal Period</button>
				<CancelButton text="Don't Update" onClick={handleCancel} />
			</form>
		</div>
	);
}
