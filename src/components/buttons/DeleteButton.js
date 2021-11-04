import React from 'react';

import './buttons.css'

export default function DeleteButton({ text, onClick, ...props }) {
	return (
		<button className='customButton' {...props} onClick={onClick}>
			<i className="fad fa-trash-alt" /> {text}
		</button>
	);
}
