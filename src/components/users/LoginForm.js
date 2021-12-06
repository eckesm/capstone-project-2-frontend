import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';
import useLocalStorageState from '../../hooks/useLocalStorageState';

import { getAndStoreUserInfo } from '../../actions/auth';
import { BackendApi } from '../../api/api';

import SubmitButton from '../buttons/SubmitButton';
import ErrorMessages from '../ErrorMessages';

import '../screen.css';
import './users.css';

export default function LoginForm() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [ emailAddress, setEmailAddress ] = useLocalStorageState('email_address') || '';
	const initialState = {
		emailAddress : emailAddress || '',
		password     : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	const [ errors, setErrors ] = useState([]);

	async function handleSubmit(evt) {
		console.log('handleSubmit run');
		evt.preventDefault();
		try {
			const res = await BackendApi.getAndStoreTokenApi(formData.emailAddress, formData.password);
			console.log('getStoreToken', res);
			if (res.status === 200) {
				setEmailAddress(formData.emailAddress);
				try {
					const userRes = await dispatch(getAndStoreUserInfo());
					if (userRes.status === 200) {
						history.push('/restaurants');
					}
				} catch (err) {
					console.log('handleSubmit() > getAndStoreToken() > getAndStoreUserInfo() error:', err);
				}
			}
			if (res.status === 401) {
				setErrors([ res.message ]);
			}
		} catch (err) {
			console.log('handleSubmit() error:', err);
		}
	}

	return (
		<form className="LoginForm BasicView" onSubmit={handleSubmit}>
			<div className="Section">
				<div className="InputGroup">
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
				<div className="InputGroup">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={formData.password}
						name="password"
						onChange={handleChange}
						required
					/>
				</div>
			</div>
			<SubmitButton text="Login" />
			<ErrorMessages errors={errors} />
		</form>
	);
}
