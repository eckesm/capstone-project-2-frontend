import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerCategoryGroup } from '../../actions/categoryGroups';

export default function NewCategoryGroupForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { active } = useSelector(store => store.restaurants);

	const initialState = {
		name  : '',
		notes : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerCategoryGroup(active.id, formData));
			if (res.status === 201) {
				history.push(`/restaurants/${active.id}/category-groups/${res.data.catGroup.id}`);
			}
		} catch (err) {
			console.log('handleSubmit() > registerCategoryGroup() error:', err);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" value={formData.name} name="name" onChange={handleChange} required />
			</div>
			<div>
				<label htmlFor="notes">Notes:</label>
				<input type="text" id="notes" value={formData.notes} name="notes" onChange={handleChange} />
			</div>
			<button type="submit">Add Category Group</button>
		</form>
	);
}
