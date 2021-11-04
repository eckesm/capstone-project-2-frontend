import React from 'react';

import './buttons.css';

export default function SubmitButton({ text, onClick, ...props }) {
	return (
		<button className="customButton" {...props} onClick={onClick}>
			<i className="fad fa-check-square" /> {text}
		</button>
	);
}
