import React from 'react';

import './buttons.css'

export default function GoButton({ text, onClick, ...props }) {
	return (
		<button className='CustomButton' {...props} onClick={onClick}>
			{text}
		</button>
	);
}
