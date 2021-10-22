import React from 'react';

export default function GoButton({ text, onClick, ...props }) {
	return (
		<button {...props} onClick={onClick}>
			{text}
		</button>
	);
}
