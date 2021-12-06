import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { addUserToRestaurant } from '../../actions/restaurants';
import { BackendApi } from '../../api/api';

import AddButton from '../buttons/AddButton';
import ErrorMessages from '../ErrorMessages';

export default function AddUserToRestaurantForm({ restaurantId }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const initialState = {
		emailAddress : '',
		isAdmin      : false
	};
	const [ formData, setFormData ] = useState(initialState);

	const handleChange = evt => {
		const { name, value, checked } = evt.target;
		if (name === 'isAdmin') {
			setFormData(data => ({
				...data,
				[name] : checked
			}));
		}
		else {
			setFormData(data => ({
				...data,
				[name] : value
			}));
		}
	};

	const [ errors, setErrors ] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		let user = null;
		try {
			const userLookupRes = await BackendApi.lookupEmailAddressApi(formData.emailAddress);
			if (userLookupRes.status === 200) {
				user = userLookupRes.data.user;
			}
			else if (userLookupRes.status === 404) {
				setErrors([ userLookupRes.message ]);
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
				else if (res.status === 400) {
					setErrors([ res.message ]);
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
			<form onSubmit={handleSubmit}>
				<div className="Section">
					<div>
						<label htmlFor="emailAddress">Email Address:</label>
						<input
							type="text"
							id="emailAddress"
							value={formData.emailAddress}
							name="emailAddress"
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="isAdmin">Administrator:</label>
						<input
							type="checkbox"
							id="isAdmin"
							checked={formData.isAdmin}
							name="isAdmin"
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="ButtonGroup">
					<AddButton text="Add User" />
				</div>
			</form>
			<ErrorMessages errors={errors} />
		</div>
	);
}
