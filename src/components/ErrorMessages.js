import React from 'react';

export default function ErrorMessages({ errors = [] }) {
	return (
		<ul className="IgnoreList">
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
		</ul>
	);
}
