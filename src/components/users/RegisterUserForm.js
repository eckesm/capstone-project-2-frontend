import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';
import useLocalStorageState from '../../hooks/useLocalStorageState';

import { getAndStoreUserInfo } from '../../actions/auth';
import { registerUserApi } from '../../helpers/api';

import SubmitButton from '../buttons/SubmitButton';
import ErrorMessages from '../ErrorMessages';

import '../screen.css';

export default function RegisterUserForm() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [ emailAddress, setEmailAddress ] = useLocalStorageState('email_address') || '';
	const initialState = {
		firstName    : '',
		lastName     : '',
		emailAddress : '',
		password     : '',
		password2    : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	const [ errors, setErrors ] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();

		if (formData.password != formData.password2) {
			setErrors([ 'Passwords do not match!' ]);
		}
		else {
			try {
				const res = await registerUserApi(formData);
				setEmailAddress(formData.emailAddress);
				console.log(res);
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
				if (res.status === 400) {
					setErrors(res.message);
				}
			} catch (err) {
				console.log('handleSubmit() > registerUserApi() error:', err);
			}
		}
	}

	return (
		<form className="RegisterUserForm BasicView" onSubmit={handleSubmit}>
			<div className="Section">
				<div className="InputGroup">
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
				<div className="InputGroup">
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
				<div className="InputGroup">
					<label htmlFor="password2">Re-Enter Password:</label>
					<input
						type="password"
						id="password2"
						value={formData.password2}
						name="password2"
						onChange={handleChange}
						required
					/>
				</div>
			</div>
			<SubmitButton text={'Register' + ' ' + formData.firstName} />
			{/* <ul className='IgnoreList'>
				{errors.map((e, idx) => {
					let message = e.replace('instance.', '');
					message = message.replace('emailAddress', 'email address');
					message = message.charAt(0).toUpperCase() + message.slice(1);
					return (
						<li key={idx} className="ErrorMessage">
							{message}
						</li>
					);
				})}
			</ul> */}
			<ErrorMessages errors={errors} />
		</form>
	);
}
