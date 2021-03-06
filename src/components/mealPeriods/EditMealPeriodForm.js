import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import useFields from '../../hooks/useFields';

import { updateMealPeriod } from '../../actions/mealPeriods';

import CancelButton from '../buttons/CancelButton';
import SubmitButton from '../buttons/SubmitButton';
import ErrorMessages from '../errorMessages/ErrorMessages';

import '../screen.css';

export default function EditMealPeriodForm({ id, name, notes, setMealPeriod, setEditing }) {
	const dispatch = useDispatch();

	const initialState = {
		name  : name,
		notes : notes === null ? '' : notes
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	const [ errors, setErrors ] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(updateMealPeriod(id, formData));
			if (res.status === 200) {
				setMealPeriod(res.data.mealPeriod);
				setEditing(false);
			}
			else if (res.status === 400) {
				setErrors(res.message)
			}
			else {
				console.log(res);
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
		<div className="EditMealPeriodForm HeadingContainer">
			<form onSubmit={handleSubmit}>
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
					<SubmitButton text="Update Meal Period" />
					<CancelButton text="Don't Update" onClick={handleCancel} />
					<ErrorMessages errors={errors} />
				</div>
			</form>
		</div>
	);
}
