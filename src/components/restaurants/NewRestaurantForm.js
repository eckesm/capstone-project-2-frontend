import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerRestaurant } from '../../actions/restaurants';

import SubmitButton from '../buttons/SubmitButton';
import ErrorMessages from '../ErrorMessages';

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
	const [ errors, setErrors ] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerRestaurant(formData));
			// console.log(res);
			if (res.status === 201) {
				history.push(`/restaurants/${res.data.restaurant.id}`);
			}
			if (res.status === 400) {
				setErrors(res.message);
			}
		} catch (err) {
			console.log('handleSubmit() > registerRestaurant() error:', err);
		}
	}

	return (
		<form className="NewRestaurantForm BasicView" onSubmit={handleSubmit}>
			<div className="Section">
				<div className="InputGroup">
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" value={formData.name} name="name" onChange={handleChange} required />
				</div>
				<div className="InputGroup">
					<label htmlFor="address">Address:</label>
					<input type="text" id="address" value={formData.address} name="address" onChange={handleChange} />
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
						type="text"
						rows="5"
						cols="50"
						id="notes"
						value={formData.notes}
						name="notes"
						onChange={handleChange}
					/>
				</div>
			</div>
			<SubmitButton text="Add Restaurant" />
			<ErrorMessages errors={errors} />
		</form>
	);
}
