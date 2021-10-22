import React from 'react';

export default function CancelButton({ text, onClick, ...props }) {
	return (
		<button {...props} onClick={onClick}>
			{text}
		</button>
	);
}
