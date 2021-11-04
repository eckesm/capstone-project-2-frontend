import React from 'react';

import './buttons.css';

export default function CancelButton({ text, onClick, ...props }) {
	return (
		<button className="customButton" {...props} onClick={onClick}>
			<i className="fad fa-pencil-alt" /> {text}
		</button>
	);
}
