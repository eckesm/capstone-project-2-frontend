import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerCategoryGroup } from '../../actions/categoryGroups';

import SubmitButton from '../buttons/SubmitButton';
import CancelButton from '../buttons/CancelButton';

import './categoryGroups.css';

export default function NewCategoryGroupForm() {
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
			const res = await dispatch(registerCategoryGroup(active.id, formData));
			if (res.status === 201) {
				history.push(`/restaurants/${active.id}/category-groups`);
			}
		} catch (err) {
			console.log('handleSubmit() > registerCategoryGroup() error:', err);
		}
	}

	return (
		<form className="NewCategoryGroupForm BasicView" onSubmit={handleSubmit}>
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
				<SubmitButton text="Add Category Group" />
				{active && (
					<CancelButton
						text="Don't Add"
						onClick={() => history.push(`/restaurants/${active.id}/category-groups`)}
					/>
				)}
			</div>
		</form>
	);
}
