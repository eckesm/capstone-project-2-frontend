import React from 'react';

import './buttons.css';

export default function AddButton({ text = 'Add', onClick, ...props }) {
	return (
		<button className="CustomButton Add" {...props} type="submit" onClick={onClick}>
			{/* <i className="fad fa-plus-circle" /> {text && text} */}
			{text}
		</button>
	);
}
