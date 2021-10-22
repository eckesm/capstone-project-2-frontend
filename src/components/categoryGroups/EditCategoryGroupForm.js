import React from 'react';
import { useDispatch } from 'react-redux';

import useFields from '../../hooks/useFields';

import { updateCategoryGroup } from '../../actions/categoryGroups';

import CancelButton from '../buttons/EditButton';

export default function EditCategoryGroupForm({ id, name, notes, setCategoryGroup, setEditing }) {
	const dispatch = useDispatch();

	const initialState = {
		name  : name,
		notes : notes === null ? '' : notes
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(updateCategoryGroup(id, formData));
			if (res.status === 200) {
				setCategoryGroup(res.data.catGroup);
				setEditing(false);
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
				<button type="submit">Update Category Group</button>
				<CancelButton text="Don't Update" onClick={handleCancel} />
			</form>
		</div>
	);
}
