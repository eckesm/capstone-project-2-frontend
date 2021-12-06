import React from 'react';

import './buttons.css';

export default function WarningButton({ text, onClick, ...props }) {
	return (
		<button className="CustomButton Warning" {...props} onClick={onClick}>
			{text}
		</button>
	);
}
