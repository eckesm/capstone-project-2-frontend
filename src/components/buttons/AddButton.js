import React from 'react';

import './buttons.css';

export default function AddButton({ text, onClick, ...props }) {
	return (
		<button className="customButton" {...props} onClick={onClick}>
			<i className="fad fa-plus-circle" /> {text && text}
		</button>
	);
}
