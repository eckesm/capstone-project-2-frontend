import React from 'react';

import './buttons.css';

export default function DeleteButton({ text, onClick, ...props }) {
	return (
		<button className="CustomButton Delete" {...props} onClick={onClick}>
			{/* <i className="fad fa-trash-alt" /> {text} */}
			{text}
		</button>
	);
}
