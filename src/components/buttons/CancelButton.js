import React from 'react';

import './buttons.css';

export default function CancelButton({ text, onClick, ...props }) {
	return (
		<button className="CustomButton Cancel" {...props} onClick={onClick}>
			{/* <i className="fad fa-window-close" /> {text} */}
			{text}
		</button>
	);
}
