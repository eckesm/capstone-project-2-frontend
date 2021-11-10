import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { addUserToRestaurant } from '../../actions/restaurants';
import { lookupEmailAddressApi } from '../../helpers/api';

export default function AddUserToRestaurantForm({ restaurantId }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const initialState = {
		emailAddress : '',
		isAdmin      : false
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		let user = null;
		try {
			const userLookupRes = await lookupEmailAddressApi(formData.emailAddress);
			if (userLookupRes.status === 200) {
				user = userLookupRes.data.user;
			}
			else {
				console.log(userLookupRes.message);
			}
		} catch (err) {
			console.log('handleSubmit() > lookupEmailAddressApi() error:', err);
		}

		if (user) {
			try {
				const res = await dispatch(addUserToRestaurant(restaurantId, user, formData));
				if (res.status === 201) {
					history.push(`/restaurants/${restaurantId}/users`);
				}
				else {
					console.log(res.message);
				}
			} catch (err) {
				console.log('handleSubmit() > addUserToRestaurant() error:', err);
			}
		}
	}

	return (
		<div>
			{/* <h1>Add User to {restaurantName}</h1> */}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="emailAddress">Email Address:</label>
					<input
						type="text"
						id="emailAddress"
						value={formData.emailAddress}
						name="emailAddress"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="isAdmin">Administrator:</label>
					<input
						type="checkbox"
						id="isAdmin"
						value={formData.isAdmin}
						name="isAdmin"
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Add User</button>
			</form>
		</div>
	);
}
