import React from 'react';

export default function AddButton({ text, onClick, ...props }) {
	return (
		<button {...props} onClick={onClick}>
			{text}
		</button>
	);
}
