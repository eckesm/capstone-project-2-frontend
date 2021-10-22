import React from 'react';
import { useDispatch } from 'react-redux';

import useFields from '../../hooks/useFields';

import { updateRestaurant } from '../../actions/restaurants';

import CancelButton from '../buttons/EditButton';

export default function EditRestaurantForm({
	id,
	name,
	address,
	phone,
	email,
	website,
	notes,
	// setRestaurant,
	setEditing
}) {
	const dispatch = useDispatch();

	const initialState = {
		name    : name,
		address : address === null ? '' : address,
		phone   : phone === null ? '' : phone,
		email   : email === null ? '' : email,
		website : website === null ? '' : website,
		notes   : notes === null ? '' : notes
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(updateRestaurant(id, formData));
			if (res.status === 200) {
				// setRestaurant(res.data.restaurant);
				setEditing(false);
			}
		} catch (err) {
			console.log('handleSubmit() > updateRestaurant() error:', err);
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
					<label htmlFor="address">Address:</label>
					<input type="text" id="address" value={formData.address} name="address" onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="phone">Phone Number:</label>
					<input type="text" id="phone" value={formData.phone} name="phone" onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="email">Email Address:</label>
					<input type="text" id="email" value={formData.email} name="email" onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="website">Website Address:</label>
					<input type="text" id="website" value={formData.website} name="website" onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="notes">Notes:</label>
					<input type="text" id="notes" value={formData.notes} name="notes" onChange={handleChange} />
				</div>
				<button type="submit">Update Restaurant</button>
				<CancelButton text="Don't Update" onClick={handleCancel} />
			</form>
		</div>
	);
}
