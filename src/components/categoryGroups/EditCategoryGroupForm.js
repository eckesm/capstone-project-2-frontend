import React,{useState} from 'react';
import { useDispatch } from 'react-redux';

import useFields from '../../hooks/useFields';

import { updateCategoryGroup } from '../../actions/categoryGroups';

import CancelButton from '../buttons/CancelButton';
import SubmitButton from '../buttons/SubmitButton';
import ErrorMessages from '../errorMessages/ErrorMessages';

export default function EditCategoryGroupForm({ id, name, notes, setCategoryGroup, setEditing }) {
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
			const res = await dispatch(updateCategoryGroup(id, formData));
			if (res.status === 200) {
				setCategoryGroup(res.data.catGroup);
				setEditing(false);
			}
			else if (res.status === 400) {
				setErrors(res.message)
			}
			else {
				console.log(res);
			}
		} catch (err) {
			console.log('handleSubmit() > updateCategoryGroup() error:', err);
		}
	}

	function handleCancel(evt) {
		evt.preventDefault();
		setEditing(false);
	}

	return (
		<div className="EditCategoryGroupForm">
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
					<SubmitButton text="Update Category Group" />
					<CancelButton text="Don't Update" onClick={handleCancel} />
					<ErrorMessages errors={errors} />
				</div>
			</form>
		</div>
	);
}
