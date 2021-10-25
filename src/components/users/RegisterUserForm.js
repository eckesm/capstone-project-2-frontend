import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';
import useLocalStorageState from '../../hooks/useLocalStorageState';

import { getAndStoreUserInfo } from '../../actions/auth';
import { registerUserApi } from '../../helpers/api';

export default function RegisterUserForm() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [ emailAddress, setEmailAddress ] = useLocalStorageState('email_address') || '';
	const initialState = {
		firstName    : '',
		lastName     : '',
		emailAddress : '',
		password     : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await registerUserApi(formData);
			setEmailAddress(formData.emailAddress);
			if (res.status === 201) {
				try {
					const userRes = await dispatch(getAndStoreUserInfo());
					if (userRes.status === 200) {
						history.push('/');
					}
				} catch (err) {
					console.log('handleSubmit() > getAndStoreToken() > getAndStoreUserInfo() error:', err);
				}
			}
		} catch (err) {
			console.log('handleSubmit() > registerUserApi() error:', err);
		}
	}

	return (
		<div>
			<h1>New Restaurant</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="firstName"> First Name:</label>
					<input
						type="text"
						id="firstName"
						value={formData.firstName}
						name="firstName"
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						id="lastName"
						value={formData.lastName}
						name="lastName"
						onChange={handleChange}
						required
					/>
				</div>
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
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={formData.password}
						name="password"
						onChange={handleChange}
					/>
				</div>

				<button type="submit">Register</button>
			</form>
		</div>
	);
}
