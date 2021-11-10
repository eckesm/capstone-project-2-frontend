import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { updateRestaurant } from '../../actions/restaurants';

import CancelButton from '../buttons/EditButton';
import SubmitButton from '../buttons/SubmitButton';

export default function EditRestaurantForm({ id, name, address, phone, email, website, notes }) {
	const dispatch = useDispatch();
	const history = useHistory();

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
				// setEditing(false);
				history.push(`/restaurants/${id}`);
			}
		} catch (err) {
			console.log('handleSubmit() > updateRestaurant() error:', err);
		}
	}

	function handleCancel(evt) {
		evt.preventDefault();
		// setEditing(false);
		history.push(`/restaurants/${id}`);
	}

	return (
		<form className="EditRestaurantForm" onSubmit={handleSubmit}>
			<div className="Section Centered">
				<div className="InputGroup">
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" value={formData.name} name="name" onChange={handleChange} required />
				</div>
				<div className="InputGroup">
					<label htmlFor="address">Address:</label>
					<textarea
						rows="3"
						cols="30"
						type="text"
						id="address"
						value={formData.address}
						name="address"
						onChange={handleChange}
					/>
				</div>
				<div className="InputGroup">
					<label htmlFor="phone">Phone Number:</label>
					<input type="text" id="phone" value={formData.phone} name="phone" onChange={handleChange} />
				</div>
				<div className="InputGroup">
					<label htmlFor="email">Email Address:</label>
					<input type="text" id="email" value={formData.email} name="email" onChange={handleChange} />
				</div>
				<div className="InputGroup">
					<label htmlFor="website">Website Address:</label>
					<input type="text" id="website" value={formData.website} name="website" onChange={handleChange} />
				</div>
				<div className="InputGroup">
					<label htmlFor="notes">Notes:</label>
					<textarea
						rows="5"
						cols="50"
						type="text"
						id="notes"
						value={formData.notes}
						name="notes"
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="ButtonGroup">
				<SubmitButton text="Update Restaurant" />
				<CancelButton text="Don't Update" onClick={handleCancel} />
			</div>
		</form>
	);
}
