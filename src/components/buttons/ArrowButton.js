import React from 'react';

import './buttons.css'

export default function ArrowButton({ text, onClick, direction = 'right', ...props }) {
	return (
		<button className="customButton" {...props} onClick={onClick}>
			{direction === 'right' && text && <span>{text} </span>}
			{direction === 'left' && <i className="fas fa-arrow-circle-left" />}
			{direction === 'right' && <i className="fas fa-arrow-circle-right" />}
			{direction !== 'right' && text && <span> {text}</span>}
		</button>
	);
}
