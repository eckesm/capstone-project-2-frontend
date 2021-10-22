import React from 'react';

export default function DeleteButton({ text, onClick, ...props }) {
	return (
		<button {...props} onClick={onClick}>
			{text}
		</button>
	);
}
