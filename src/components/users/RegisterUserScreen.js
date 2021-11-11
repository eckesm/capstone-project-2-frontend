import React from 'react';

import RegisterUserForm from './RegisterUserForm';

import '../screen.css';

export default function RegisterUserScreen() {

	return (
		<div className="Window">
			<div className="RegisterUserScreen Screen">
				<p className="ScreenTitle">New User</p>
				<RegisterUserForm />
			</div>
		</div>
	);
}
