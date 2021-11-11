import React from 'react';

import LoginForm from './LoginForm';

import '../screen.css';

export default function LoginScreen() {

	return (
		<div className="Window">
			<div className="LoginScreen Screen">
				<p className="ScreenTitle">Login</p>
				<LoginForm />
			</div>
		</div>
	);
}
