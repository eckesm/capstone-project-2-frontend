import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerRestaurant } from '../../actions/restaurants';

export default function NewRestaurantForm() {
	const dispatch = useDispatch();
	const history = useHistory();

	const initialState = {
		name    : '',
		address : '',
		phone   : '',
		email   : '',
		website : '',
		notes   : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerRestaurant(formData));
			console.log(res);
			if (res.status === 201) {
				history.push(`/restaurants/${res.data.restaurant.id}`);
			}
		} catch (err) {
			console.log('handleSubmit() > registerRestaurant() error:', err);
		}
	}

	return (
		<div>
			<h1>New Restaurant</h1>
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
				<button type="submit">Add Restaurant</button>
			</form>
		</div>
	);
}
