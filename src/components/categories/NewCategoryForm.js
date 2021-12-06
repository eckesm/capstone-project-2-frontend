import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerCategory } from '../../actions/categories';

import AddButton from '../buttons/AddButton';
import CancelButton from '../buttons/CancelButton';
import ErrorMessages from '../ErrorMessages';

import './categories.css';

export default function NewCategoryForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const active = useSelector(store => store.active);

	const initialState = {
		name        : '',
		catGroupId  : '0',
		cogsPercent : '',
		notes       : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	const [ errors, setErrors ] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerCategory(active.id, formData));
			if (res.status === 201) {
				history.push(`/restaurants/${active.id}/categories`);
			}
			else if (res.status === 400) {
				setErrors(res.message)
			}
			else {
				console.log(res);
			}
		} catch (err) {
			console.log('handleSubmit() > registerCategory() error:', err);
		}
	}

	return (
		<form className="NewCategoryScreen BasicView" onSubmit={handleSubmit}>
			<div className="InputGroup">
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" value={formData.name} name="name" onChange={handleChange} required />
			</div>
			{active &&
			active.catGroups.length > 0 && (
				<div className="InputGroup">
					<label htmlFor="catGroupId">Category Group:</label>
					<select
						type="text"
						id="catGroupId"
						value={formData.catGroupId}
						name="catGroupId"
						onChange={handleChange}
					>
						<option key="0" value="0">
							No Group
						</option>
						{active.catGroups.map(cg => {
							return (
								<option key={cg.id} value={cg.id}>
									{cg.name}
								</option>
							);
						})}
					</select>
				</div>
			)}
			<div className="InputGroup">
				<label htmlFor="cogsPercent">COGS Percent:</label>
				<input
					type="number"
					step="0.0001"
					min="0"
					max="1"
					id="cogsPercent"
					value={formData.cogsPercent}
					name="cogsPercent"
					onChange={handleChange}
				/>
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
				<AddButton text="Add Category" />
				{active && (
					<CancelButton
						text="Don't Add"
						onClick={() => history.push(`/restaurants/${active.id}/categories`)}
					/>
				)}
				<ErrorMessages errors={errors} />
			</div>
		</form>
	);
}
