import React from 'react';

import './buttons.css'

export default function GoButton({ text, onClick, ...props }) {
	return (
		<button className='customButton' {...props} onClick={onClick}>
			{text}
		</button>
	);
}
