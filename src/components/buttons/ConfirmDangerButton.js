import React from 'react';

import './buttons.css'

export default function ConfirmDangerButton({ text, onClick, ...props }) {
	return (
		<button className='CustomButton Danger' {...props} onClick={onClick}>
			{text}
		</button>
	);
}
