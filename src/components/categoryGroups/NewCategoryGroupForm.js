import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerCategoryGroup } from '../../actions/categoryGroups';

import AddButton from '../buttons/AddButton';
import CancelButton from '../buttons/CancelButton';
import ErrorMessages from '../ErrorMessages';

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

	const [ errors, setErrors ] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerCategoryGroup(active.id, formData));
			if (res.status === 201) {
				history.push(`/restaurants/${active.id}/category-groups`);
			}
			else if (res.status === 400) {
				setErrors(res.message);
			}
			else {
				console.log(res);
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
				<AddButton text="Add Category Group" />
				{active && (
					<CancelButton
						text="Don't Add"
						onClick={() => history.push(`/restaurants/${active.id}/category-groups`)}
					/>
				)}
				<ErrorMessages errors={errors} />
			</div>
		</form>
	);
}
