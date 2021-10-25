import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerCategory } from '../../actions/categories';

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

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerCategory(active.id, formData));
			if (res.status === 201) {
				history.push(`/restaurants/${active.id}/categories`);
			}
			else if (res.status === 400 || res.status === 404 || res.status === 500) {
				console.log(res.message);
			}
			else {
				console.log(res);
			}
		} catch (err) {
			console.log('handleSubmit() > registerCategory() error:', err);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" value={formData.name} name="name" onChange={handleChange} required />
			</div>
			{/* <div>
				<label htmlFor="catGroupId">catGroupId:</label>
				<input
					type="text"
					id="catGroupId"
					value={formData.catGroupId}
					name="catGroupId"
					onChange={handleChange}
				/>
			</div> */}
			{active &&
			active.catGroups.length > 0 && (
				<div>
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
			<div>
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
			<div>
				<label htmlFor="notes">Notes:</label>
				<input type="text" id="notes" value={formData.notes} name="notes" onChange={handleChange} />
			</div>
			<button type="submit">Add Category</button>
		</form>
	);
}
