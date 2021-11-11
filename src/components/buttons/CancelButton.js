import React from 'react';

export default function CancelButton({ text, onClick, ...props }) {
	return (
		<button className='CustomButton' {...props} onClick={onClick}>
			<i className="fad fa-window-close"></i> {text}
		</button>
	);
}
