import React from 'react';

export default function EditButton({ text, onClick, ...props }) {
	return (
		<button {...props} onClick={onClick}>
			{text}
		</button>
	);
}
