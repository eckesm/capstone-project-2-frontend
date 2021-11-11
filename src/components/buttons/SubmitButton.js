import React from 'react';

import './buttons.css';

export default function SubmitButton({ text, onClick, ...props }) {
	return (
		<button className="CustomButton" {...props} type="submit" onClick={onClick}>
			{/* <i className="fad fa-check-square" /> {text} */}
			{text}
		</button>
	);
}
