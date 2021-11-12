import React from 'react';
import { useDispatch } from 'react-redux';

import useFields from '../../hooks/useFields';

import { updateCategory } from '../../actions/categories';

import CancelButton from '../buttons/CancelButton';
import SubmitButton from '../buttons/SubmitButton';

import '../screen.css';

export default function EditCategoryForm({
	id,
	name,
	catGroupId,
	cogsPercent,
	notes,
	catGroups = [],
	setCategory,
	setEditing
}) {
	const dispatch = useDispatch();

	const initialState = {
		name        : name,
		catGroupId  : catGroupId === null ? '' : catGroupId,
		cogsPercent : cogsPercent === null ? '' : cogsPercent,
		notes       : notes === null ? '' : notes
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(updateCategory(id, formData));
			if (res.status === 200) {
				setCategory(res.data.category);
				setEditing(false);
			}
			else if (res.status === 400 || res.status === 404 || res.status === 500) {
				console.log(res.message);
			}
			else {
				console.log(res);
			}
		} catch (err) {
			console.log('handleSubmit() > updateCategory() error:', err);
		}
	}

	function handleCancel(evt) {
		evt.preventDefault();
		setEditing(false);
	}

	return (
		<div className="EditCategoryForm">
			<form onSubmit={handleSubmit}>
				<div className="InputGroup">
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" value={formData.name} name="name" onChange={handleChange} required />
				</div>
				{catGroups.length > 0 && (
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
							{catGroups.map(cg => {
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
						min="0"
						max="1"
						step="0.0001"
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
					<SubmitButton text="Update Category" />
					<CancelButton text="Don't Update" onClick={handleCancel} />
				</div>
			</form>
		</div>
	);
}
