import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../hooks/useFields';
import useLocalStorageState from '../hooks/useLocalStorageState';

import { getAndStoreToken, getAndStoreUserInfo } from '../actions/auth';

export default function LoginForm() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [ emailAddress, setEmailAddress ] = useLocalStorageState('email_address') || '';
	const initialState = {
		emailAddress : emailAddress || '',
		password     : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(getAndStoreToken(formData.emailAddress, formData.password));
			if (res.status === 200) {
				setEmailAddress(formData.emailAddress);
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
			console.log('handleSubmit() error:', err);
		}
	}

	return (
		<div>
			<h1>Login</h1>
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
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={formData.password}
						name="password"
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
